var expect = require('chai').expect;
var dbService = require('../../../api/service/dbService.js');
var User = dbService.User;
var Meeting = dbService.Meeting;
var Room = dbService.Room;
var MeetingUser = dbService.MeetingUser;

describe('User ',function(){
  describe('User register', function(){
    var testUser = {
      username: 'livhong',
      password: '123456'
    }
    it('register a user', function(){
      return User.register(testUser.username, testUser.password).then(function(user){
        console.log(user)
        expect(user.get('username')).to.equal(testUser.username)
      },function(error){

      });
    });
    it('register conflict', function(){
      return User.register(testUser.username, testUser.password).then(function(user){
        console.log(user)
        expect(user.username).to.equal(testUser.username)
      },function(error){
        console.log(error)
        expect(error).to.equal('username repeated')
      });
    });
  });
  describe('User login & get & delete', function(){
    var uuser;
    it('login testUser', function(){
      return User.login(testUser.username, testUser.password).then(function(user){
        console.log(user)
        uuser.username = user.get('username')
        uuser.uid = user.get('uid')
        expect(user.get('username')).to.equal(testUser.username)
      }, function(error){
        console.log(error)
      })
    })

    it('login error', function(){
      return User.login('no_such_user','no_such_user', testUser.password).then(function(user){
        console.log(user)
        uuser.username = user.get('username')
        uuser.uid = user.get('uid')
        expect(user.get('username')).to.equal(testUser.username)
      }, function(error){
        console.log(error)
      })
    })

    it('getByUid', function(){
      console.log(uuser)
      return User.getByUid(uuser.uid).then(
        function (user){
          console.log(user)
          expect(uuser.username).to.equal(user.get('username'))
        },
        function(error){
          console.log(error)
        }
      )
    })

    it('getByUid no such user', function(){
      console.log(uuser)
      return User.getByUid(-1).then(
        function (user){
          console.log(user)
          expect(uuser.username).to.equal(user.get('username'))
        },
        function(error){
          console.log(error)
        }
      )
    })

    it('getByUidList', function(){
      return User.getByUidList([uuser.uid]).then(function(userList){
        userList.forEach(function(item){
          console.log(item)
          expect(uuser.username).to.equal(item.get('username'))
        })
      })
    })

    it('deleteUser', function(){
      return User.deleteUser(uuser.uid).then(function(result){
        console.log(result)
        expect(result).to.be.true
      })
    })

  });

});
