/**
 * Created by Zhongyi on 6/29/16.
 */
"use strict";
const expect = require('chai').expect;
const User = require('../../../api/models/users');

describe('User', ()=> {
  it('lists all users', () => {
    return new Promise((res, rej)=> {
      let users = new User();
      users.getAllUsers().then((data)=> {
        res(data);
      })

    }).then((data)=> {
      console.log(data);
    })
  });
});