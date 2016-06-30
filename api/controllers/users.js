'use strict';

const util = require('util');
const apiwrap = require('./apibase').apiwrap;
const User = require('../models/users');

module.exports = {
  getAllUsers: apiwrap((req, res) => {
    let users = new User();
    users.getAllUsers().then((data)=> {
      res.json(200, {
        users: data
      });
    })
  })
};