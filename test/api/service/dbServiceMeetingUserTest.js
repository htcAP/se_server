var expect = require('chai').expect;
var dbService = require('../../../api/service/dbService.js');
var MeetingUser = dbService.MeetingUser;

describe('MeetingUser', function(){

    var mu = {
        mid:1,
        uid:1,
        user_type:1
    };

    describe('create',function(){
        it('createMeetingUser', function(){
            return MeetingUser.createMeetingUser(mu.mid, mu.uid, mu.user_type).then(
                (result)=>{
                    mu = result;
                    //console.log("[createMeetingUser] "+JSON.stringify(result))
                    //console.log("[createMeetingUser] "+result.get('muid'))
                    expect(result).to.be.ok;
                }
            )
        });
    });

    describe('get',function(){

        it('getListByMeetingAndUserType', function(){
            return MeetingUser.getListByMeetingAndUserType(mu.get('mid'), mu.get('user_type')).then(
                (muList)=>{
                    //console.log("[getListByMeetingAndUserType] "+JSON.stringify(muList))
                    expect(muList[0].get('mid')).to.equal(mu.get('mid'))
                    expect(muList[0].get('user_type')).to.equal(mu.get('user_type'))
                },
                (error)=>{
                    console.log("[getListByMeetingAndUserType] "+JSON.stringify(error))
                }
            )
        });

        it('getListByMid', function(){
            return MeetingUser.getListByMid(mu.get('mid')).then(
                (muList)=>{
                    //expect(muList.length).to.equal(1)
                    expect(muList[0].get('mid')).to.equal(mu.get('mid'))
                }
            )
        });

        it('getListByUid', function(){
            return MeetingUser.getListByUid(mu.get('uid')).then(
                (muList)=>{
                    //expect(muList.length).to.equal(1)
                    expect(muList[0].get('uid')).to.equal(mu.get('uid'))
                }
            )
        });

        it('getMeetings', function(){
            return MeetingUser.getMeetings(0, 1).then(
                (muList)=>{
                    expect(muList.length).to.equal(1)
                    //expect(muList[0].get('muid')).to.equal(mu.get('muid'))
                }
            )
        });

        it('getByMuid', function(){
            return MeetingUser.getByMuid(mu.get('muid')).then(
                (result)=>{
                    console.log("[getByMuid] "+mu.get('muid'))
                    expect(result.get('name')).to.equal(mu.get("name"))
                }
            )
        });

    });

    describe('delete',function(){
        it('deleteMeetingUser', function(){
            return MeetingUser.deleteMeetingUser(mu.get('muid')).then(
                (result)=>{
                    expect(result).to.equal(true)
                }
            )
        });
    });

});