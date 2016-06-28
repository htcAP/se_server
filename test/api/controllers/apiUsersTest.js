var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('getAllUsersTest', function() {

    describe('GET /getAllUsers', function() {

      it('login first', function(done) {


        request(server)
          .post('/api/sessions')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ username: "1233" , password : "1111111" })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            done();
          });
      });

      it('get all users', function(done) {


        request(server)
          .get('/api/users')
          .set('Accept', 'application/json')
          .set('Cookie',1)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.not.empty;
            done();
          });
      });

    });

  });

});
