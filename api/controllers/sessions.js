'use strict';

const util = require('util');

module.exports = {
  login: (req, res) => {
    res.header('Set-Cookie', 'UID=0; PATH=/;');
    res.json(200, {
      hello: 'world'
    });
  }
};