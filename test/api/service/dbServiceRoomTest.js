var expect = require('chai').expect;
var dbService = require('../../../api/service/dbService.js');
var Room = dbService.Room;

describe('Room', function(){
    var room = {
        name: "room_test"
    };

    describe('create', function(){
        it('createRoom', function(){
            return Room.createRoom(room.name).then(
                (result)=>{
                    room = result;
                    expect(result).to.be.ok;
                }
            );
        });
    });

    describe('get', function(){

        it('getByRid', function(){
            return Room.getByRid(room.get('rid')).then(
                (result)=>{
                    expect(result).to.be.ok;
                }
            )
        });

        it('getRooms', function(){
            return Room.getRooms(0, 1).then(
                (roomList)=>{
                    expect(roomList[0]).to.be.ok;
                }
            )
        });

        it('getByRidList', function(){
            return Room.getByRidList([room.get('rid')]).then(
                (roomList)=>{
                    expect(roomList.length).to.equal(1)
                    expect(roomList[0].get('name')).to.equal(room.get('name'))
                }
            );
        });

    });

    describe('update', function(){
        it('updateRoom', function(){
            return Room.updateRoom({rid:room.get('rid'),name:'newname'}).then(
                (res)=>{
                    expect(res).to.equal(true);
                }
            )
        });
    });

    describe('delete', function(){
        it('deleteRoom', function(){
            return Room.deleteRoom(room.get('rid')).then(
                (res)=>{
                    expect(res).to.equal(true)
                }
            )
        });
    });
})