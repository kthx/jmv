var request = require('supertest');
var should = require('should');
var app = require('../../app.js');


describe('Upload route', function () {
    it('accepts upload of a zip', function (done) {
        var cwd = process.cwd();
        request(app)
            .post('/upload')
            .attach('file', cwd + '/fixtures/upload.zip')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                var result = JSON.parse(res.text);
                (result.success).should.be.true;
        
        done()
      })
    });

    it('accepts upload of a single java file', function (done) {
        var cwd = process.cwd();
        request(app)
            .post('/upload')
            .attach('file', cwd + '/fixtures/upload.java')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                var result = JSON.parse(res.text);
                (result.success).should.be.true;
        
        done()
      })
    });

    it('it returns a path where file has been copied to for single file', function (done) {
        var cwd = process.cwd();
        request(app)
            .post('/upload')
            .attach('file', cwd + '/fixtures/upload.java')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                var result = JSON.parse(res.text);
                (result.path.length > 0).should.be.true;
                done();
            });
    });

    it('it return a path where the files have been copied to for a zip archive', function (done) {
        var cwd = process.cwd();
        request(app)
            .post('/upload')
            .attach('file', cwd + '/fixtures/upload.java')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                var result = JSON.parse(res.text);
                (result.path.length > 0).should.be.true;
                done();
            });
    });
});