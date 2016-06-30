var expect = require('chai').expect;
var dbService = require('../../../api/service/dbService.js');
var Meeting = dbService.Meeting;
var User = dbService.User;
var Promise = require('bluebird');

function createMeeting(_title, _note, _start_time, _end_time, _rid){
    this.title = _title;
    this.note = _note;
    this.start_time = _start_time;
    this.end_time = _end_time;
    this.rid = _rid;
}

describe('Meeting', function(){

    //describe('User login & get & delete', function(){
    //    var testUser = {
    //        username: 'livhong',
    //        password: '123456'
    //    }
    //    it('login testUser', function(){
    //        return User.login(testUser.username, testUser.password).then(function(data){
    //            //console.log("[login testUser] "+JSON.stringify(data));
    //            expect(data.code).to.equal(0)
    //            //console.log('login testuser '+data.get('username'))
    //        })
    //    })
    //});

    var meetings = [];
    for(var i=0; i < 3; i++){
        meetings[i] = new createMeeting('title'+i, 'note'+i,
            new Date('2016-03-10 0'+i+':00:00'), new Date('2016-03-10 0'+i+':'+(i+1)+'0:00'),
        i);
    }
    //console.log(JSON.stringify(meetings))
    var uMeetings = [];
    describe('create', function(){
        it('createMeeting', function(){
            //var result = Promise.resolve(true);
            //meetings.forEach(function(meeting){
            //    result = result.then(function(res){
            //        expect(res).to.be.ok;
            //        return Meeting.createMeeting(meeting.title, meeting.note, meeting.start_time,
            //            meeting.end_time, meeting.rid).then(function(res){
            //                //console.log("[createMeeting] "+res.get('title'));
            //                return Promise.resolve(res)
            //            });
            //    });
            //});
            //return result;
            var promiseList = [];
            meetings.forEach(function(meeting){
                promiseList.push(Meeting.createMeeting(meeting.title, meeting.note, meeting.start_time,
                            meeting.end_time, meeting.rid).then(function(res){
                                //console.log("[createMeeting] "+res.get('title'));
                            uMeetings.push(res);
                            //console.log("[createMeeting] "+JSON.stringify(res));
                            expect(res).to.be.ok;
                    }));
            });
            return Promise.all(promiseList);
        })

        it('create null meeting', function(){
            return Meeting.createMeeting().then(function(res){
                expect(res).to.not.be.ok;
            })
        })

    })

    describe('get', function(){

        it('getMeetings', function(){
            return Meeting.getMeetings(0, meetings.length).then(function(data){
                //console.log("[getMeetings] data: "+JSON.stringify(data))
                //uMeetings = data;
                //data.forEach(function(meeting){
                //    meetings.forEach(function(item){
                //        if(item.rid==meeting.get('rid')){
                //            expect(item.title).to.equal(meeting.get('title'));
                //        }
                //    });
                //});
                //console.log("[getMeetings] "+JSON.stringify(data))
                expect(data.length).to.equal(meetings.length);
            });
        });

        it('getMeetingsByTime', function(){
            return Meeting.getMeetingsByTime(new Date('2016-03-10 00:00:00'),
                new Date('2016-03-10 01:05:00')).then(function(data){
                    data.forEach(function(item){
                        console.log("[getMeetingsByTime] start_time "+item.get('start_time'))
                        console.log("[getMeetingsByTime] end_time "+item.get('end_time'))
                    });
                });
        })

        it('getMeetingByMid', function(){
            return Meeting.getMeetingByMid(uMeetings[0].get('mid')).then(function(meeting){
                //console.log('[getMeetingByMid] '+JSON.stringify(meeting))
                expect(meeting.get('mid')).to.equal(uMeetings[0].get('mid'));
            })
        })

        it('getByMidList', function(){
            var midList = [];
            for(var i=0; i<uMeetings.length;i++){
                midList.push(uMeetings[i].get('mid'))
            }
            //console.log("[getByMidList] "+JSON.stringify(midList));
            return Meeting.getByMidList(midList).then(function(data){
                //data.forEach(function(meeting){
                //    meetings.forEach(function(item){
                //        if(item.rid==meeting.rid){
                //            expect(item.title).to.equal(meeting.get('title'));
                //        }
                //    });
                //});
                console.log("[getByMidList] "+JSON.stringify(data));
                expect(data.length).to.equal(meetings.length);
            })
        })

        it('getMeetingsByRid', function(){
            return Meeting.getMeetingsByRid(uMeetings[0].get('rid')).then(
                (mList)=>{
                    expect(mList).to.be.ok;
                }
            )
        })

    })

    describe('update', function(){
        it('updateMeeting', function(){
            uMeetings[0].set('title',uMeetings[0].get('title')+"update");
            return Meeting.updateMeeting(uMeetings[0]).then(function(res){
                expect(res).to.equal(true);
            })
        })
    })


    describe('delete', function(){

        it('deleteMeeting', function(){
            return Meeting.deleteMeeting(uMeetings[0].get('mid')).then(function(res){
                expect(res).to.equal(true)
            });
        })

        it('deleteMeeting', function(){
            return Meeting.deleteMeeting(uMeetings[1].get('mid')).then(function(res){
                expect(res).to.equal(true)
            });
        })

        it('deleteMeeting', function(){
            return Meeting.deleteMeeting(uMeetings[2].get('mid')).then(function(res){
                expect(res).to.equal(true)
            });
        })

        //it('deleteMeetingList', function(){
        //    var midList = [];
        //    uMeetings.forEach(function(item, index){
        //        if(index!=0){
        //            midList.push(item.get('mid'))
        //        }
        //    })
        //    return Meeting.deleteMeetingList(midList).then(function(res){
        //        expect(res).to.equal(true)
        //    })
        //})
    })

});