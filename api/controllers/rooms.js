'use strict';

const util = require('util');
const apiwrap = require('./apibase').apiwrap;

module.exports = {
  rooms: apiwrap((req, res) => {
    res.json(200, {
      hello: 'world'
    });
  })
};