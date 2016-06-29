/**
 * Created by Zhongyi on 6/29/16.
 */
"use strict";
const expect = require('chai').expect;
const dbService = require('../../../api/service/dbService.js');
const Meeting = require('../../../api/models/meetings')
describe('Meeting', function () {
  describe('GetSuggestions', function () {

    it('has conflicts', function () {
      return new Promise((res, rej)=> {
        let req = {
          start_time: "2016-01-01 08:00:00",
          end_time: "2016-01-01 12:00:00",
          duration: 30,
          required_ids: [1, 2, 3, 4]
        };

        let meetings = new Meeting();
        meetings.getMeetingSuggestions(req.start_time, req.end_time, req.duration, req.required_ids).then((suggestions)=> {
          res(suggestions);
        });
      }).then((suggestions)=> {
        console.log(suggestions);
        // expect(true).to.equal(false);

      })
    });

    it('has no conflicts', function () {
      return new Promise((res, rej)=> {
        let req = {
          start_time: "2015-06-28 13:20:45",
          end_time: "2017-06-30 13:20:45",
          duration: 30,
          required_ids: [1, 2, 3, 4]
        };

        let meetings = new Meeting();
        meetings.getMeetingSuggestions(req.start_time, req.end_time, req.duration, req.required_ids).then((suggestions)=> {
          res(suggestions);
        });
      }).then((suggestions)=> {
        console.log(suggestions);
        // expect(true).to.equal(false);

      })
    });

  })
});