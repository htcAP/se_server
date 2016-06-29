var Promise = require('bluebird');
var AV = require('leancloud-storage');
var APP_ID = '6hjoJO3gYUru1WRmUF6rEWSY-gzGzoHsz';
var APP_KEY = 'f48Rjlw7ToeY1cdG5Na7AKWn';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var User = {
  register: function (username, password) {
    //DO NOT FORGET ERROR CODE
    //if error, show error code
    var user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    //return user.signUp();
    return user.signUp().then(function (user) {
      user.code = 0;
      return Promise.resolve(user);
    }, function (error) {
      return Promise.resolve(error);
    });
  },
  login: function (username, password) {
    return AV.User.logIn(username, password).then(function (user) {
      user.code = 0;
      return Promise.resolve(user);
    }, function (error) {
      return Promise.resolve(error);
    });
  },
  getByUid: function (uid) {
    var query = new AV.Query('_user');
    query.equalTo('uid', uid);
    return query.find().then(function (uList) {
      if (uList.length == 0) {
        return Promise.resolve(false);
      }
      return Promise.resolve(uList[0]);
    }, function (error) {
      console.log('[User][getByUid]: ' + JSON.stringify(error));
      return Promise.resolve(false);
    });
  },
  getByUidList: function (uidList) {
    //var query = new AV.Query('_user');
    //var filter = uidList;
    //query.equalTo('uid', filter);
    //return query.find()

    var q;
    uidList.forEach(function (uid) {
      var query = new AV.Query('_user');
      query.equalTo('uid', uid);
      if (q) {
        q = AV.Query.or(q, query);
      } else {
        q = query;
      }
    })
    return q.find();

  },
  deleteUser: function (uid) {
    return this.getByUid(uid).then(function (user) {
      if (!user) {
        return Promise.resolve(false);
      }
      //console.log("objectId "+user.get('objectId'));
      //var tUser = AV.Object.createWithoutData('_user', user.get('objectId'));
      return AV.Query.doCloudQuery('delete from _user where objectId="' + user.get('objectId') + '"').then(function (success) {
        //console.log("[delete user]success "+JSON.stringify(success))
        return Promise.resolve(true);
      }, function (error) {
        console.log("[delete user]error " + JSON.stringify(error))
        return Promise.resolve(false);
      });
    })
  },
  currentUser: function () {
    var currentUser = AV.User.current();
    return currentUser;
  },
  logout: function () {
    AV.User.logOut();
  },
  getAllUsers: function () {
    var query = new AV.Query('_User');
    query.exists('username');
    return query.find().then(function (data) {
      return Promise.resolve(data);
    }, function (error) {
      return Promise.resolve(false);
    });
  }

}

var Meeting = {
  createMeeting: function (title, note, start_time, end_time, rid) {
    var MeetingFolder = AV.Object.extend('Meeting');
    var meetingFolder = new MeetingFolder();
    meetingFolder.set('title', title);
    meetingFolder.set('note', note);
    meetingFolder.set('start_time', start_time);
    meetingFolder.set('end_time', end_time);
    meetingFolder.set('rid', rid);
    var acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    meetingFolder.setACL(acl);
    return meetingFolder.save().then(function (meeting) {
      var query = new AV.Query('Meeting');
      return query.get(meeting.get('objectId')).then(
          (result)=>Promise.resolve(result),
          (error)=>Promise.resolve(false)
      );
    }, function (error) {
      console.log("[Meeting][createMeeting]: " + JSON.stringify(error));
      return Promise.resolve(false);
    });
  },
  deleteMeeting: function (mid) {
    return this.getMeetingByMid(mid).then(function (meeting) {
      if (!meeting) {
        return Promise.resolve(false);
      }
      return AV.Query.doCloudQuery('delete from Meeting where objectId="' + meeting.get('objectId') + '"').then(function (success) {
        //console.log("[delete user]success "+JSON.stringify(success))
        return Promise.resolve(true);
      }, function (error) {
        console.log("[delete meeting]error " + JSON.stringify(error))
        return Promise.resolve(false);
      });
    });
  },
  deleteMeetingList: function (midList) {
    return this.getByMidList(midList).then(function (meetings) {
      return AV.Object.destroyAll(meetings).then(
          ()=>Promise.resolve(true),
          ()=>Promise.resolve(false)
      );
    });
  },
  updateMeeting: function (meetings) {
    //mid, title, note, start_time, end_time, rid
    return this.getMeetingByMid(meetings.mid).then(function (meeting) {
      if (!meeting) {
        return Promise.resolve(false);
      }
      var meetingFolder = AV.Object.createWithoutData('Meeting', meeting.get('objectId'));
      meetingFolder.set('title', meetings.title);
      meetingFolder.set('note', meetings.note);
      meetingFolder.set('start_time', meetings.start_time);
      meetingFolder.set('end_time', meetings.end_time);
      meetingFolder.set('rid', meetings.rid);
      return meetingFolder.save().then(
          ()=>Promise.resolve(true)
          , ()=>Promise.resolve(false)
      );
    });

  },
  getMeetings: function (start, limit) {
    var query = new AV.Query('Meeting');
    query.skip(start);
    query.limit(limit);
    return query.find();
  },
  getMeetingsByTime: function (start_time, end_time) {
    var queryA = new AV.Query('Meeting');
    queryA.lessThanOrEqualTo('start_time', end_time);
    var queryB = new AV.Query('Meeting');
    queryB.greaterThanOrEqualTo('end_time', start_time);
    var query = AV.Query.and(queryA, queryB);
    return query.find();
  },
  getMeetingByMid: function (mid) {
    var query = new AV.Query('Meeting');
    query.equalTo('mid', mid);
    return query.find().then(function (mList) {
      if (mList.length == 0) {
        return Promise.resolve(false);
      }
      return Promise.resolve(mList[0]);
    }, function (error) {
      console.log('[Meeting][getMeetingByMid]: ' + JSON.stringify(error));
      return Promise.resolve(false);
    });
  },
  getByMidList: function (midList) {
    var q;
    midList.forEach(function (mid) {
      var query = new AV.Query('Meeting');
      query.equalTo('mid', mid);
      if (q) {
        q = AV.Query.or(q, query);
      } else {
        q = query;
      }
    })
    return q.find();
  },
  getMeetingsByRid: function (rid) {
    var query = new AV.Query('Meeting');
    query.equalTo('rid', rid);
    return query.find();
  }
}

var Room = {
  createRoom: function (name) {
    var RoomFolder = AV.Object.extend('Room');
    var roomFolder = new RoomFolder();
    roomFolder.set('name', name);
    var acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    roomFolder.setACL(acl);
    return roomFolder.save().then(function (room) {
      var query = new AV.Query('Room');
      return query.get(room.get('objectId')).then(
          (result)=>Promise.resolve(result),
          (error)=>Promise.resolve(false)
      );
    }, function (error) {
      return Promise.resolve(false);
    });
  },
  deleteRoom: function (rid) {
    return this.getByRid(rid).then(function (result) {
      if (!result) {
        Promise.resolve(false);
      }
      return AV.Query.doCloudQuery('delete from Room where objectId="' + result.get('objectId') + '"').then(function (success) {
        //console.log("[delete user]success "+JSON.stringify(success))
        return Promise.resolve(true);
      }, function (error) {
        console.log("[delete room]error " + JSON.stringify(error))
        return Promise.resolve(false);
      });
    });
  },
  updateRoom: function (room) {
    return this.getByRid(room.rid).then(function (r) {
      var todo = AV.Object.createWithoutData('Room', r.get('objectId'));
      todo.set('name', room.name);
      return todo.save().then(
          ()=>Promise.resolve(true),
          ()=>Promise.resolve(false)
      );
    });
  },
  getByRid: function (rid) {
    var query = new AV.Query('Room');
    query.equalTo('rid', rid);
    return query.find().then(function (mList) {
      if (mList.length == 0) {
        return Promise.resolve(false);
      }
      return Promise.resolve(mList[0]);
    }, function (error) {
      console.log('[Room][getByRid]: ' + JSON.stringify(error));
      return Promise.resolve(false);
    });
  },
  getRooms: function (start, limit) {
    var query = new AV.Query('Room');
    query.skip(start);
    query.limit(limit);
    return query.find();
  },
  getByRidList: function (ridList) {
    var q;
    ridList.forEach(function (rid) {
      var query = new AV.Query('Room');
      query.equalTo('rid', rid);
      if (q) {
        q = AV.Query.or(q, query);
      } else {
        q = query;
      }
    })
    return q.find();
  }
}

var MeetingUser = {
  createMeetingUser: function (mid, uid, user_type) {
    var MuFolder = AV.Object.extend('MeetingUser');
    var muFolder = new MuFolder();
    muFolder.set('mid', mid);
    muFolder.set('uid', uid);
    muFolder.set('user_type', user_type);
    var acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    muFolder.setACL(acl);
    return muFolder.save().then(function (mu) {
      var query = new AV.Query('MeetingUser');
      return query.get(mu.get('objectId')).then(
          (result)=>Promise.resolve(result),
          (error)=>Promise.resolve(false)
      );
    }, function (error) {
      return Promise.resolve(false);
    });
  },
  getListByMeetingAndUserType: function (mid, user_type) {
    var query = new AV.Query('MeetingUser');
    query.equalTo('mid', mid);
    query.equalTo('user_type', user_type);
    return query.find();
  },
  getListByMid: function (mid) {
    var query = new AV.Query('MeetingUser');
    query.equalTo('mid', mid);
    return query.find();
  },
  getListByUid: function (uid) {
    var query = new AV.Query('MeetingUser');
    query.equalTo('uid', uid);
    return query.find();
  },
  getMeetings: function (start, limit) {
    var query = new AV.Query('MeetingUser');
    query.skip(start);
    query.limit(limit);
    return query.find();
  },
  getByMuid: function (muid) {
    var query = new AV.Query('MeetingUser');
    query.equalTo('muid', muid);
    return query.find().then(function (muList) {
      if (muList.length == 0) {
        return Promise.resolve(false);
      }
      return Promise.resolve(muList[0]);
    }, function (error) {
      console.log('[MeetingUser][getByMuid]: ' + JSON.stringify(error));
      return Promise.resolve(false);
    });
  },
  deleteMeetingUser: function (muid) {
    return this.getByMuid(muid).then(function (mu) {
      if (!mu) {
        Promise.resolve(false);
      }
      return AV.Query.doCloudQuery('delete from MeetingUser where objectId="' + mu.attributes.objectId + '"').then(function (success) {
        //console.log("[delete user]success "+JSON.stringify(success))
        return Promise.resolve(true);
      }, function (error) {
        console.log("[delete mu]error " + JSON.stringify(error))
        return Promise.resolve(false);
      });
    });
  },
  deleteMeetingUserByObjectId: function (id) {
    return AV.Query.doCloudQuery('delete from MeetingUser where objectId="' + id + '"').then(function (success) {
      return Promise.resolve(true);
    }, function (error) {
      console.log("[delete mu]error " + JSON.stringify(error));
      return Promise.resolve(false);
    });
  },
  deleteMeetingUserByMID: function (mid) {
    var self = this;
    return this.getListByMid(mid).then(function (mu) {
      if (!mu) {
        return Promise.resolve(false);
      }
      var promiseList = [];
      for (var user of mu) {
        var id = user.id;
        promiseList.push(self.deleteMeetingUserByObjectId(id));
      }
      return Promise.all(promiseList).then(function () {
        return Promise.resolve(true);
      });
    });
  }
};


module.exports = {
  User: User,
  Meeting: Meeting,
  Room: Room,
  MeetingUser: MeetingUser
};
