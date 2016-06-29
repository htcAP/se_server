/**
 * Created by Zhongyi on 6/29/16.
 */
"use strict";
const dbservice = require('../service/dbService');
class Session {
  login(username, password) {
    return new Promise((res, rej)=> {
      dbservice.User.login(username, password).then((data) => {
        res(data);
      })
    })
  }
}

module.exports = Session;