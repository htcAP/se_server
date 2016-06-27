'use strict';

const util = require('util');
const apiwrap = require('./apibase').apiwrap;
var dbservice = require('../service/dbService');

module.exports = {
  getAllUsers: apiwrap((req, res) => {
    dbservice.User.getAllUsers().then(function(data){
      res.json(200, {
        users: data,
      });
    })
  })
};