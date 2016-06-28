'use strict';
var Promise = require('bluebird');
const util = require('util');
const apiwrap = require('./apibase').apiwrap;
var dbservice = require('../service/dbService');
var expect = require('chai').expect;
var should = require('should');
var request = require('supertest');


module.exports = {
  getAllMeetings: apiwrap((req, res) => {
	dbservice.Meeting.getMeetings(0,1000).then(function(data){
		res.json(200, {
			meetings: req.cookie,
    });
	})
  }),

  getMeeting: apiwrap((req, res) => {
	var array = req.path.split("/");
	var stringOfId = array[array.length-1];
	dbservice.Meeting.getMeetingByMid(parseInt(stringOfId)).then(function(data){
		
		res.json(200, {
			meeting: data,//.get('mid'),
    });
	})
  }),

  createMeeting: apiwrap((req, res) => {
    dbservice.Meeting.createMeeting(req.body.title, req.body.note, new Date(req.body.start_time), new Date(req.body.end_time), parseInt(req.body.room_id)).then(function(data){
		res.json(200, {
			message: 'mid:'+data.get('mid'),
    });
	})
  }),
//parseInt(req.body.id)
  deleteMeeting: apiwrap((req, res) => {
	var array = req.path.split("/");
	var stringOfId = array[array.length-1];
    dbservice.Meeting.deleteMeeting(parseInt(stringOfId)).then(function(data){
		if(data == false){
			res.json(200, {
			message:'meeting don'+"'"+'t exit!',
			});
		}
		else{
			res.json(200, {
			message:'successfuly delete',
			});
		}
	})
  }),

  getMeetingSuggestions: apiwrap((req, res, uid) => {
    
  })

};