var request = require('supertest');
var should = require('should');
var app = require('../../app.js');


describe('Results route', function () {
    it('results index return angular view', function (done) {
        request(app)
            .get('/results/index')
            .expect(200)
            .end(function (err, res) {
                (res.text.indexOf('ng-view') > -1).should.be.true;
                done()
            })
    });
    it('results index returns error when not found', function (done) {
        request(app)
            .get('/results/api/doesNotExist')
            .send({newXmlContent: "searchMe"})
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                var result = JSON.parse(res.text);
                (result.error == 'ResultNotFound').should.be.true;
                done();
            });
    });

    it('results api request runs without error', function (done) {
        request(app)
            .get('/results/api/fixtureZip')
            .send({newXmlContent: "searchMe"})
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                var result = JSON.parse(res.text);
                (result.title == 'JMV Results').should.be.true;
                done();
            });
    });

    it('results api request returns source code', function (done) {
        request(app)
            .get('/results/api/fixtureZip')
            .send({newXmlContent: "searchMe"})
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                
                var result = res.body;

                (result.result[Object.keys(result.result)[0]].source.length > 0).should.be.true;
                done();
            });
    });

    it('results api request returns checkstyleResults', function (done) {
        request(app)
            .get('/results/api/fixtureZip')
            .send({newXmlContent: "searchMe"})
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                
                var result = res.body;
                (result.checkstyleResults.checkstyle.file[0].error.length > 0).should.be.true;
                done();
            });
    });
});