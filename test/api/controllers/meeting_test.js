var should = require('should');
var request = require('supertest');
var server = require('../../../app');
var expect = require('chai').expect;
var meeting = require('../../../api/controllers/meetings.js');

describe('controllers', function() {

  describe('meetingTest', function() {

    describe('GET /getAllMeetings', function() {

      it('should return a object', function() {

        request(server)
          .get('/getAllMeetings')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            //should.not.exist(err);
			expect(res.body).to.eql('object'); 

            //res.body.should.eql('Hello, stranger!');
          });
      });  
		
    });
	
	
	describe('GET /getMeeting', function() {

      it('should return a object', function() {

        request(server)
          .get('/getMeeting')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
			expect(res.body).to.be.an('object'); 

            //res.body.should.eql('Hello, stranger!');
          });
      }); 
		it('should accept a mid parameter', function() {

        request(server)
          .get('/getMeeting')
          .query({ mid: '220'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            expect(res.body).to.be.an('object'); 

          });
      });
		
    });
	
	describe('POST /createMeeting', function() {

      it('should return a string', function() {

        request(server)
          .get('/createMeeting')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
			expect(res.body).to.be.an('object'); 
          });
      }); 
		it('should accept 5 parameters', function() {

        request(server)
          .get('/createMeeting')
          .query({ mid: '220'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            expect(res.body).to.be.an('object'); 

          });
      });
		
    });
	
	describe('DELETE /deleteMeeting', function() {

      it('should return a string', function() {

        request(server)
          .get('/deleteMeeting')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
			expect(res.body).to.be.an('object'); 
          });
      }); 
		it('should accept a mid parameter', function() {

        request(server)
          .get('/deleteMeeting')
          .query({ mid: '221'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            expect(res.body).to.be.an('object'); 

          });
      });
		
    });

  });
});