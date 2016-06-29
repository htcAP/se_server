'use strict';

const util = require('util');
const Session = require('../models/sessions');

module.exports = {
  login: (req, res) => {
    let sessions = new Session();
    sessions.login(req.body.username, req.body.password).then((data)=> {
      let attrs = data.attributes;
      if (attrs) {
        res.setHeader('Set-Cookie', ' PATH=/;', ' UID = ' + data.uid);
        res.json(200, {
          UID: data.uid
        });
      } else {
        res.json(403, {
          message: "Incorrect username or password."
        });
      }
    });
  }
};