'use strict';

const util = require('util');
const apiwrap = require('./apibase').apiwrap;

module.exports = {
  getAllUsers: apiwrap((req, res) => {
    res.json(200, {
      hello: 'world'
    });
  })
};