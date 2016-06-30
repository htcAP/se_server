/**
 * Created by Zhongyi on 6/29/16.
 */
"use strict";
const dbservice = require('../service/dbService');
class User {
  getAllUsers() {
    return new Promise((res, rej)=> {
      dbservice.User.getAllUsers().then((data) => {
        res(data);
      })
    })
  }
}

module.exports = User;