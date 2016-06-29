/**
 * Created by Zhongyi on 6/29/16.
 */
"use strict";
const expect = require('chai').expect;
const Meeting = require('../../../api/models/meetings')
describe('Meeting', () => {
  describe('GetSuggestions', () => {

    it('has conflicts', () => {
      return new Promise((res, rej)=> {
        let req = {
          start_time: "2016-01-01 08:00:00",
          end_time: "2016-01-01 12:00:00",
          duration: 30,
          required_ids: [1, 2, 3, 4]
        };

        let meetings = new Meeting();
        meetings.getMeetingSuggestions(req.start_time, req.end_time, req.duration, req.required_ids)
            .then((suggestions)=> {
              res(suggestions);
            });
      }).then((suggestions)=> {
        console.log(suggestions);
      })
    });

    it('has no conflicts', ()=> {
      return new Promise((res, rej)=> {
        let req = {
          start_time: "2015-06-28 13:20:45",
          end_time: "2017-06-30 13:20:45",
          duration: 30,
          required_ids: [1, 2, 3, 4]
        };

        let meetings = new Meeting();
        meetings.getMeetingSuggestions(req.start_time, req.end_time, req.duration, req.required_ids)
            .then((suggestions)=> {
              res(suggestions);
            });
      }).then((suggestions)=> {
        console.log(suggestions);
      })
    });

  });

  describe('GetMeeting', ()=> {
    it('gets an existed meeting', ()=> {
      return new Promise((res, rej)=> {
        let meetings = new Meeting();
        meetings.getMeeting(239)
            .then((meeting)=> {
              res(meeting);
            });
      }).then((meeting)=> {
        console.log(meeting);
        expect(meeting.mid).to.equal(239);
      })
    });

    it('gets a not existed meeting', ()=> {
      return new Promise((res, rej)=> {
        let meetings = new Meeting();
        meetings.getMeeting(-1)
            .then((meeting)=> {
              res(meeting);
            });
      }).then((meeting)=> {
        console.log(meeting);
        expect(meeting).to.equal(false);
      })
    });

    it('gets all meetings', ()=> {
      return new Promise((res, rej)=> {
        let meetings = new Meeting();
        meetings.getAllMeetings()
            .then((meetings)=> {
              res(meetings);
            });
      }).then((meetings)=> {
        console.log(meetings);
      })
    });
  });

  describe('CreateMeeting', ()=> {
    it('creates a meeting', ()=> {
      let req = {
        start_time: "2013-01-01 08:00:00",
        end_time: "2013-01-01 12:00:00",
        title: "test_title",
        note: "test_note",
        room_id: 4,
        required_ids: [1, 2, 3, 4],
        suggested_ids: []
      };
      return new Promise((res, rej)=> {
        let meetings = new Meeting();
        meetings.createMeeting(req.title, req.note, req.start_time, req.end_time,
            req.room_id, req.required_ids, req.suggested_ids)
            .then((message)=> {
              res(message);
            });
      }).then((message)=> {
        console.log(message);
        expect(typeof message).to.equal("number");
      })
    }).timeout(20000);
  });

  describe('DeleteMeeting', ()=> {
    it('deletes a meeting', ()=> {
      return new Promise((res, rej)=> {
        let meetings = new Meeting();
        meetings.deleteMeeting(254)
            .then((message)=> {
              res(message);
            });
      }).then((message)=> {
        console.log(message);
      })
    }).timeout(20000);
  })
});