/**
 * Created by Zhongyi on 6/29/16.
 */
"use strict";
const expect = require('chai').expect;
const dbService = require('../../../api/service/dbService.js');
const Session = require('../../../api/models/sessions');

describe('Session', ()=> {
  describe('Login', ()=> {

    it('succeeds', () => {
      return new Promise((res, rej)=> {
        let req = {
          username: "htc",
          password: "3.14159"
        };

        let sessions = new Session();
        sessions.login(req.username, req.password).then((data)=> {
          res(data);
        })

      }).then((data)=> {
        console.log(data.attributes);
        expect(data.attributes.uid).to.equals(1);
      })
    });


    it('fails', () => {
      return new Promise((res, rej)=> {
        let req = {
          username: "htc",
          password: "3.1415926"
        };

        let sessions = new Session();
        sessions.login(req.username, req.password).then((data)=> {
          res(data);
        })

      }).then((data)=> {
        console.log(data.attributes);
        expect(data.attributes).to.equals(undefined);
      })
    });


  })
});