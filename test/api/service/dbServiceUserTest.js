var expect = require('chai').expect;
var dbService = require('../../../api/service/dbService.js');
var User = dbService.User;

describe('User ',function(){
  var testUser = {
    username: 'livhong',
    password: '123456'
  }
  describe('User register', function(){
    //it('register a user', function(){
    //  return User.register(testUser.username, testUser.password).then(function(data){
    //    //console.log(data)
    //    expect(data.code).to.equal(0)
    //    expect(data.get('username')).to.equal(testUser.username)
    //  });
    //});
    it('register conflict', function(){
      return User.register(testUser.username, testUser.password).then(function(data){
        //console.log(data)
        //console.log('error.code '+data.code)
        //{ code: 202, message: 'Username has already been taken' }
        expect(data.code).to.equal(202);
      });
    });
  });
  describe('User login & get & delete', function(){
    var uuser = {};
    it('login testUser', function(){
      return User.login(testUser.username, testUser.password).then(function(data){
        //console.log("[login testUser] "+JSON.stringify(data));
        expect(data.code).to.equal(0)
        //console.log('login testuser '+data.get('username'))
        uuser.username = data.get('username')
        uuser.uid = data.get('uid')
        expect(data.get('username')).to.equal(testUser.username)
      })
    })

    //it('login error', function(){
    //  return User.login('no_such_user','no_such_user', testUser.password).then( function(data){
    //    //{ code: 211, message: 'Could not find user' }
    //    //{"code":1,"message":"登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码。"}
    //    //console.log("[login error]"+JSON.stringify(data))
    //    expect(data.code).to.not.equal(0);
    //  })
    //})

    it('getByUid', function(){
      //console.log("[getByUid]uuser "+JSON.stringify(uuser))
      return User.getByUid(uuser.uid).then(
        function (user){
          //[{"uid":3,"username":"livhong","emailVerified":false,"mobilePhoneVerified":false,"objectId":"576659c1207703006bb2e3b9","createdAt":"2016-06-19T08:37:21.438Z","updatedAt":"2016-06-19T08:37:21.438Z"}]
          //console.log("[getByUid]user "+JSON.stringify(user))
          //expect(user.length).to.equal(1);
          expect(user).to.be.ok;
          expect(uuser.username).to.equal(user.get('username'))
        });
    })

    it('getByUidList', function(){
      return User.getByUidList([uuser.uid]).then(function(userList){
        userList.forEach(function(item){
          //console.log("[getByUidList] "+JSON.stringify(item))
          expect(uuser.username).to.equal(item.get('username'))
        })
      })
    })

    it('currentUser', function(){
      var user = User.currentUser();
      expect(user.get('username')).to.equal(uuser.username)
    })

    it('logout', function(){
      User.logout();
      var user = User.currentUser();
      expect(user).to.not.be.ok;
    })

    //it('deleteUser', function(){
    //  return User.deleteUser(uuser.uid).then(function(result){
    //    //console.log("[deleteUser] "+result)
    //    expect(result).to.be.true
    //  })
    //})

  });

});
