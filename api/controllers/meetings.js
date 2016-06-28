'use strict';
var Promise = require('bluebird');
const util = require('util');
const apiwrap = require('./apibase').apiwrap;
var dbservice = require('../service/dbService');

module.exports = {
  getAllMeetings: apiwrap((req, res) => {
	dbservice.Meeting.getMeetings(0,1000).then(function(data){
		res.json(200, {
			meetings: data,
    });
	})
  }),

  getMeeting: apiwrap((req, res) => {
	dbservice.Meeting.getMeetingByMid(req.body.mid).then(function(data){
		res.json(200, {
			meeting: data.get('mid'),
    });
	})
  }),

  createMeeting: apiwrap((req, res) => {
    dbservice.Meeting.createMeeting(req.body.title, req.body.note, new Date(req.body.start_time), new Date(req.body.end_time), parseInt(req.body.room_id)).then(function(data){
		res.json(200, {
			message: 'mid:'+data.get('mid'),
    });
	})
  }),

  deleteMeeting: apiwrap((req, res) => {
    dbservice.Meeting.deleteMeeting(req.body.mid).then(function(data){
		res.json(200, {
			message:'successfuly delete '+data,
    });
	})
  }),

  getMeetingSuggestions: apiwrap((req, res, uid) => {
    let Meeting = dbservice.Meeting;
    let Room = dbservice.Room;
    let MeetingUser=dbservice.MeetingUser;
    let User = dbservice.User;
    let start=new Date(req.body.range_start);
    let end=new Date(req.body.range_end);

    Meeting.getMeetingsByTime(start,end).then((meetings)=>{
      Room.getRooms(0,1000).then((result)=>{
        let roomList=result;
        //console.log("全部rooms:"+roomList.length+" "+result[0].get('rid'));
        //////////得到预约时间段内所有空闲的room///////////////////////////
        meetings.forEach((item)=>{
          for(let i=0;i<roomList.length;i++){
            if(roomList[i].get('rid')==(item.get('rid'))){
              roomList.splice(i,1);
              //roomList.remove(i);
              break;
            }
          }
        })

        let conflictId=[];
        let isConflict=0;
        if(roomList!=null && roomList.length!=0){ //有空闲的会议室，再匹配必须参会成员时间
            for(let k=0;k<req.body.required_ids.length;k++){
                let must_id=req.body.required_ids[k];
                meetings.forEach((item)=>{ //检查每个与预约时间相冲突的会议
                  MeetingUser.getListByMid(item.get('mid')).then(//取出冲突会议中所有必须参会人员，检查是否有req中的必须参会人员
                      (muList)=>{
                        muList.forEach((mu)=>{
                          if(mu.get('uid')==must_id){//如果人员冲突，将userid放入冲突人员列表
                            conflictId.push(must_id);
                            isConflict=1;
                          }
                        })
                      }
                  )
                })
            }

          if(isConflict==0){//如果既没有人员冲突又没有会议室冲突，返回第一个可用会议室
            res.json(200, {
              conflict: false,
              suggestions: [
                { start_time:req.body.range_start ,
                  end_time: req.body.range_end,
                  room: {
                    id:roomList[0].get('rid'),
                    name:roomList[0].get('name')
                  },
                }
              ],
            });
          }

        }
        else{//在该时间段内没有空闲的会议室
          isConflict=1;
        }
        ////////////////////////////////////////////////////////
        ///////////////冲突后再找新的时间///////////////////////
        function Segges(start_time,end_time,roomid,roomname){
          this.start_time=start_time;
          this.end_time=end_time;
          this.room={
            id:roomid,
            name:roomname
          };
        }

        if(isConflict==1){
           let suggesList=[];
           while(suggesList==null || suggesList.length<5) {
             start.setTime(start.getTime() + 60 * 60 * 1000);
             end.setTime(end.getTime() + 60 * 60 * 1000);
             roomList = result;
             Meeting.getMeetingsByTime(start, end).then((secondmeetings)=> {
               //////////得到预约时间段内所有空闲的room///////////////////////////
               secondmeetings.forEach((item)=> {
                 for (let i = 0; i < roomList.length; i++) {
                   if (roomList[i].get('rid')==item.get('rid')) {
                     roomList.remove(i);
                     break;
                   }
                 }
               })
               ////////////////////////////////////////////////////////////////////
               let isConflict=0;
               if (roomList != null && roomList.length != 0) { //有空闲的会议室，再匹配必须参会成员时间
                 req.required_ids.forEach((must_id)=> { //对于每个必须参会的用户
                   secondmeetings.forEach((item)=> { //检查每个与预约时间相冲突的会议
                     MeetingUser.getListByMid(item.get('mid')).then(//取出冲突会议中所有必须参会人员，检查是否有req中的必须参会人员
                         (muList)=> {
                           muList.forEach((mu)=> {
                             if (mu.get('uid')==must_id) {//如果人员冲突，将userid放入冲突人员列表
                               conflictId.push(must_id);
                               isConflict = 1;
                             }
                           })
                         }
                     )
                   })
                 })
               }
               if(isConflict==0){//如果既没有人员冲突又没有会议室冲突，添加所有会议室
                 for(let i=0;i<roomList.length;i++){
                   suggesList.push(new Segges(start,end,roomList[i].get('rid'),roomList[i].get('name')));
                 }
               }
             })

           }
          /////////超过五个方案去除////////////////////
          if(suggesList.length>5){
            for (let i=5;i<suggesList.length;i++){
              suggesList.remove(i);
            }
          }
          /////////返回推荐方案//////////////////////
          res.json(200, {
            conflict: true,
            suggestions: suggesList,
          });

        }

      })
    });
  })

};