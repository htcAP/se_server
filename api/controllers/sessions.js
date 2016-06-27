'use strict';

const util = require('util');
var dbservice = require('../service/dbService');

module.exports = {
  login: (req, res) => {
    dbservice.User.login(req.username,req.password).then(function(data){
      res.setHeader('Set-Cookie', ' PATH=/;',' UID = ' + data.uid);
      res.json(200, {
        UID: data.uid,
      });
    })

  }
};