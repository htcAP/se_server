'use strict';
const apiwrap = require('./apibase').apiwrap;
const dbservice = require('../service/dbService');
const Meeting = require('../models/meetings');

module.exports = {
  getAllMeetings: apiwrap((req, res) => {
    let meetings = new Meeting();
    meetings.getAllMeetings().then((data)=> {
      res.json(200, {
        meetings: data
      });
    });
  }),

  getMeeting: apiwrap((req, res) => {
    let meetings = new Meeting();
    let id = parseInt(req.swagger.params.id.value);
    meetings.getMeeting(id).then((data)=> {
      res.json(200, {
        meeting: data
      });
    })
  }),

  createMeeting: apiwrap((req, res) => {
    let meetings = new Meeting();
    meetings.createMeeting(req.body.title, req.body.note,
        new Date(req.body.start_time), new Date(req.body.end_time),
        parseInt(req.body.room_id),
        req.body.required_ids, req.body.suggested_ids)
        .then((mid)=> {
          res.json(200, {
            message: 'Meeting created.'
          });
        })
  }),

  deleteMeeting: apiwrap((req, res) => {
    let meetings = new Meeting();
    let id = parseInt(req.swagger.params.id.value);
    meetings.deleteMeeting(id).then((fuck)=> {
      res.json(200, {
        message: 'Meeting deleted.'
      });
    });
  }),

  getMeetingSuggestions: apiwrap((req, res) => {
    let meetings = new Meeting();
    meetings.getMeetingSuggestions(req.body.range_start, req.body.range_end,
        req.body.duration, req.body.required_ids).then((suggestions)=> {
      res.json(200, {
        "conflict": (suggestions.length == 5),
        "suggestions": suggestions
      });
    });
  })

};