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
}

module.exports = Meeting;