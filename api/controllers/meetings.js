'use strict';

const util = require('util');
const apiwrap = require('./apibase').apiwrap;

module.exports = {
  getAllMeetings: apiwrap((req, res) => {
    res.json(200, {
      hello: 'world'
    });
  }),

  getMeeting: apiwrap((req, res) => {
    res.json(200, {
      hello: 'world'
    });
  }),

  createMeeting: apiwrap((req, res) => {
    res.json(200, {
      hello: 'world'
    });
  }),

  deleteMeeting: apiwrap((req, res) => {
    res.json(200, {
      hello: 'world'
    });
  }),

  getMeetingSuggestions: apiwrap((req, res, uid) => {
    res.json(200, {
      hello: 'world'
    });
  })
};