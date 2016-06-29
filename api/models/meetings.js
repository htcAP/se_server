/**
 * Created by Zhongyi on 6/28/16.
 */
"use strict";
const dbservice = require('../service/dbService');

class Meeting {
  getMeetingSuggestions(range_start, range_end, duration, required_ids) {
    let range_start_date = new Date(range_start), range_end_date = new Date(range_end),
        step_size = duration * 60 * 1000;
    let start_time = range_start_date, end_time = new Date(range_start_date.getTime() + step_size);

    return new Promise((res, rej)=> {
      dbservice.Meeting.getMeetings(0, 1000).then((meetings)=> {
        dbservice.Room.getRooms(0, 1000).then((rooms)=> {
          dbservice.MeetingUser.getMeetings().then((meetingUsers)=> {
            // Search in range
            while (end_time < range_end_date) {
              let room_results = this.findSolution(start_time, end_time, required_ids, meetings, rooms, meetingUsers);
              if (room_results.length > 0) {
                res([{
                  start_time: start_time,
                  end_time: end_time,
                  room: {
                    id: room_results[0].rid,
                    name: room_results[0].name
                  }
                }]);
              }
              start_time = end_time;
              end_time = new Date(start_time.getTime() + step_size);
            }

            // Out of range
            let suggestions = [];
            while (suggestions.length < 5) {
              let room_results = this.findSolution(start_time, end_time, required_ids, meetings, rooms, meetingUsers);
              for (let room_result of room_results) {
                suggestions.push({
                  start_time: start_time,
                  end_time: end_time,
                  room: {
                    id: room_result.rid,
                    name: room_result.name
                  }
                });
              }
              start_time = end_time;
              end_time = new Date(start_time.getTime() + step_size);
            }

            res(suggestions.slice(0, 5));
          })
        })
      }, (err)=> {
        console.log(err);
      })
    })
  }

  findSolution(start_time, end_time, required_ids, meetings, rooms, meetingUsers) {
    let conflictMeetings = [], conflictRooms = [];
    for (let meeting of meetings) {
      let meetingStart = meeting.attributes.start_time,
          meetingEnd = meeting.attributes.end_time;
      if (!(meetingEnd < start_time || meetingStart > end_time)) {
        conflictMeetings.push(meeting.attributes.mid);
        conflictRooms.push(meeting.attributes.rid);
      }
    }

    // No conflict meetings
    if (conflictMeetings.length == 0) {
      let availableRooms = [];
      for (let room of rooms) {
        let rid = room.attributes.rid, name = room.attributes.name;
        availableRooms.push({rid: rid, name: name});
      }
      return availableRooms;
    }

    // Check conflict users
    for (let user of meetingUsers) {
      let uid = user.attributes.uid,
          mid = user.attributes.mid;

      if (conflictMeetings.indexOf(mid) != -1 && required_ids.indexOf(uid) != -1) {
        return [];
      }
    }

    // Check conflict rooms
    let availableRooms = [];
    for (let room of rooms) {
      let rid = room.attributes.rid, name = room.attributes.name;
      if (conflictRooms.indexOf(rid) == -1) {
        availableRooms.push({rid: rid, name: name});
      }
    }

    return availableRooms;
  }

  getAllMeetings() {
    let self = this;
    return new Promise((res, rej)=> {
      dbservice.Meeting.getMeetings(0, 1000).then((allData)=> {
        let result = [];
        let outerPromiseList = [];
        for (let data of allData) {
          if (!data) {
            res(false);
            return;
          }
          outerPromiseList.push(self.getMeeting(data.attributes.mid).then((meeting)=> {
            result.push(meeting);
          }));
        }
        Promise.all(outerPromiseList).then(()=> {
          res(result);
        });
      })
    });
  }

  getMeeting(id) {
    return new Promise((res, rej)=> {
      dbservice.Meeting.getMeetingByMid(parseInt(id)).then((data)=> {
        if (!data) {
          res(false);
          return;
        }
        dbservice.MeetingUser.getListByMid(data.attributes.mid).then((userList)=> {
          // console.log(userList);
          let required_users = [], suggested_users = [];
          let promiseList = [];
          for (let user of userList) {
            let uid = user.attributes.uid,
                type = user.attributes.user_type;
            if (type == 0) {
              promiseList.push(dbservice.User.getByUid(uid).then((user)=> {
                suggested_users.push(user.attributes);
              }));
            } else {
              promiseList.push(dbservice.User.getByUid(uid).then((user)=> {
                required_users.push(user.attributes);
              }));
            }
          }
          Promise.all(promiseList).then(()=> {
            data.attributes.required_users = required_users;
            data.attributes.suggested_users = suggested_users;

            dbservice.Room.getByRid(data.attributes.rid).then((room)=> {
              data.attributes.room = room.attributes;
              delete data.attributes.rid;
              res(data.attributes);
            })
          })
        });
      })
    })
  }

  createMeeting(title, note, start_time, end_time, room_id, required_ids, suggested_ids) {
    return new Promise((res, rej)=> {
      dbservice.Meeting.createMeeting(title, note, new Date(start_time), new Date(end_time), room_id)
          .then((data)=> {
            let mid = data.attributes.mid;
            let promiseList = [];
            for (let user of suggested_ids) {
              promiseList.push(dbservice.MeetingUser.createMeetingUser(mid, user, 0));
            }
            for (let user of required_ids) {
              promiseList.push(dbservice.MeetingUser.createMeetingUser(mid, user, 1));
            }
            Promise.all(promiseList).then((msg)=> {
              res(mid);
            })
          });
    })
  }

  deleteMeeting(mid) {
    return new Promise((res, rej)=> {
      dbservice.Meeting.deleteMeeting(mid).then((fuck)=> {
        dbservice.MeetingUser.deleteMeetingUserByMID(mid).then((fuck2)=> {
          res(true);
        })
      })
    })
  }
}

module.exports = Meeting;