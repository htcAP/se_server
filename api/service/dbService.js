var AV = require('leancloud-storage');
var APP_ID = '6hjoJO3gYUru1WRmUF6rEWSY-gzGzoHsz';
var APP_KEY = 'f48Rjlw7ToeY1cdG5Na7AKWn';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var User = {
  register: function(username, password){
    //DO NOT FORGET ERROR CODE
    //if error, show error code
    var user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    return user.signUp();
  },
  login: function(username, password){
    return AV.User.logIn(username, password)
  },
  getByUid: function(uid){
    var query = new AV.Query('_user');
    query.equalTo('uid', uid);
    return query.find();
  },
  getByUidList: function(uidList){
    var query = new AV.Query('_user');
    var filter = uidList;
    query.equalTo('uid', filter);
    return query.find()
  },
  deleteUser: function(uid){
    
  }
}

var Meeting = {
  createMeeting: function(title, note, start_time, end_time, rid){},
  deleteMeeting: function(mid){},
  updateMeeting: function(mid, title, note, start_time, end_time){},
  getMeetings: function(start, limit){},
  getMeetingsByTime: function(start_time, end_time){},
  getMeetingByMid: function(mid){},
  getByMidList: function(midList){}
}

var Room = {
  createRoom: function(name){},
  deleteRoom: function(rid){},
  updateRoom: function(rid, name){},
  getByRid: function(rid){},
  getRooms: function(start, limit){},
  getByRidList: function(ridList){}
}

var MeetingUser = {
  getUidListByMeetingAndUserType: function(mid, user_type){},
  getMeetingsByMid: function(mid){},
  getMeetingsByRid: function(rid){},
  getMeetingsByUid: function(uid){},
  getMeetings: function(start, limit){}
}

module.exports = {
    User: User,
    Meeting: Meeting,
    Room: Room,
    MeetingUser: MeetingUser
}
