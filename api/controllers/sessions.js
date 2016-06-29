'use strict';

const util = require('util');
const Session = require('../models/sessions');

module.exports = {
  login: (req, res) => {
    let sessions = new Session();
    sessions.login(req.body.username, req.body.password).then((data)=> {
      let attrs = data.attributes;
      if (attrs) {
        console.log(attrs.uid);
        res.setHeader('Set-Cookie', ' PATH=/;', ' UID = ' + attrs.uid);
        res.json(200, {
          uid: attrs.uid
        });
      } else {
        res.json(403, {
          message: "Incorrect username or password."
        });
      }
    });
  }
};