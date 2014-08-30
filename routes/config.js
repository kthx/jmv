var express = require('express');
var router = express.Router();
var fs = require('fs');
var xml2js = require('xml2js');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/api', function(req, res) {
    var parser = new xml2js.Parser();
    var cwd = process.cwd();
    
    fs.readFile( cwd + '/config/checkstyle_config.xml', function(err, data) {
        parser.parseString(data, function (err, configContent) {
            var config = configContent;
            res.json({ 
                data: JSON.stringify(config)
            });
        });
    });

});

module.exports = router;