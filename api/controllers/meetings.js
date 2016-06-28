'use strict';
var Promise = require('bluebird');
const util = require('util');
const apiwrap = require('./apibase').apiwrap;
var dbservice = require('../service/dbService');

module.exports = {
  getAllMeetings: apiwrap((req, res) => {
	dbservice.Meeting.getMeetings(req.start,req.limit).then(function(data){
		res.json(200, {
			meetings: data,
    });
	})
  }),

  getMeeting: apiwrap((req, res) => {
	dbservice.Meeting.getMeetingByMid(req.mid).then(function(data){
		res.json(200, {
			meeting: data.get('mid'),
    });
	})
  }),

  createMeeting: apiwrap((req, res) => {
    dbservice.Meeting.createMeeting(req.title, req.note, req.start_time, req.end_time, req.rid).then(function(data){
		res.json(200, {
			message: 'mid:'+data.get('mid'),
    });
	})
  }),

  deleteMeeting: apiwrap((req, res) => {
    dbservice.Meeting.deleteMeeting(req.mid).then(function(data){
		res.json(200, {
			message:'successfuly delete '+data,
    });
	})
  }),

  getMeetingSuggestions: apiwrap((req, res) => {
    
	res.json(200, {
		hellow: 'world',
    });
	
  })

};