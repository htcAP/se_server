'use strict';

const util = require('util');
const apiwrap = require('./apibase').apiwrap;
var dbservice = require('../service/dbService');

module.exports = {
  rooms: apiwrap((req, res) => {
	dbservice.Room.getRooms(req.start,req.limit).then(function(data){
		res.json(200, {
		rooms: data,
    });
	})
  })
};