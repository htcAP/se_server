/**
 * Created by Zhongyi on 6/28/16.
 */
"use strict";
const dbservice = require('../service/dbService');

class Meeting {
  getSuggestions(range_start, range_end, duration, required_ids) {
    let range_start_date = new Date(range_start), range_end_date = new Date(range_end);
    this.step_size = duration * 60 * 1000;
    let start_time = range_start_date, end_time = range_end_date + step_size;

    // Search in range
    return new Promise((res, rej)=> {
      this.findSolution(start_time, end_time, required_ids).then((fuck)=> {
        // Search out of range
        this.findSolution(start_time, end_time, required_ids, [], 0, 5).then((suggestions)=> {
          res(suggestions);
        });
      });
    })
  }


  findSolution(start_time, end_time, required_ids, suggestions, counter, limit) {
    return new Promise((res, rej)=> {
      let resultObj = this.getConflictPairs(start_time, end_time, required_ids).then((resultObj)=> {
        if (resultObj.conflictUsers.length == 0) {
          // No user conflicts, go find available rooms
          let room = this.getOneAvailableRoom(resultObj.conflictRooms);
          if (room != null) {
            suggestions.append({
              start_time: start_time,
              end_time: end_time,
              room_id: room
            });
          }
        }
        // Go search another time
        start_time = Math.min(resultObj.latest_end_time, end_time);
        end_time += start_time + this.step_size;
        counter += 1;
        if (suggestions.length < limit && counter < 10) {
          this.findSolution(start_time, end_time, required_ids, suggestions, counter);
        } else {
          res(suggestions);
        }
      });
    });
  }

  getConflictPairs(start, end, required_ids) {
    return new Promise((res, rej)=> {
      let promise = dbservice.getMeetingInRange(start, end);
      promise.then((result)=> {
        let conflictUserList = [], conflictRoomList, latest = null;
        res({
          conflictUsers: conflictUserList,
          conflictRooms: conflictRoomList,
          latest_end_time: latest
        });
      });
    });

  }

  getOneAvailableRoom(conflictRooms) {
    let allRooms = dbservice.getRooms(0, 1000);
    for (let room in allRooms) {
      if (conflictRooms.indexOf(room) != -1) {
        return room;
      }
    }
    return null;
  }
}

module.exports = Meeting;