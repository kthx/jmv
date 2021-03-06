var request = require('supertest');
var should = require('should');
var app = require('../../app.js');


describe('partial routes', function () {
    it('index partial returns uploadForm', function (done) {
        request(app)
            .get('/partials/index')
            .expect(200)
            .end(function (err, res) {
                (res.text.indexOf('uploadForm') > -1).should.be.true;
                done();
            }) 
    });

    it('config partial returns configForm', function (done) {
        request(app)
            .get('/partials/config')
            .expect(200)
            .end(function (err, res) {
                (res.text.indexOf('configForm') > -1).should.be.true;
                done();
            })
    });

    it('results partial returns resultContainer', function (done) {
        request(app)
            .get('/partials/results')
            .expect(200)
            .end(function (err, res) {
                (res.text.indexOf('resultContainer') > -1).should.be.true;
                done();
            })
    });
});