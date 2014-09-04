var express = require('express');
var router = express.Router();
var fs = require('fs');
var xml2js = require('xml2js');
var readline = require('readline');
var lineReader = require('line-reader');

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

router.get('/:resultId', function(req, res) {
	res.render('index', { title: 'Results JMV' });
});


/* GET home page. */
router.get('/api/:resultId', function(req, res) {
	var resultId = req.params.resultId;
	var parser = new xml2js.Parser();
	var results = {};
    var cwd = process.cwd();
    
    var configPath = cwd+ '/results/' + resultId + '/checkstyle/output.xml'
    var filesPath = cwd + '/results/' + resultId + '/files/';
    
    fs.exists(configPath, function(exists) {
        if (exists) {
            fs.readFile(configPath, function(err, data) {
                parser.parseString(data, function (err, checkstyleResults) {
                    checkstyleResults.checkstyle.file.forEach(function(item, index, array){
                        if(item.$.name.endsWith('.java')) {
                            results[item.$.name.replace(filesPath, '')] = {};
                            results[item.$.name.replace(filesPath, '')].source = [];
                            lineReader.eachLine(item.$.name, function(line, last) {
                                results[item.$.name.replace(filesPath, '')].source.push(line);
                                if(last && (index === array.length - 1)){
                                    res.json({ 
                                        currentUrl: '/results/' + resultId,
                                        title: 'JMV Results', 
                                        result: results, 
                                        checkstyleResults: checkstyleResults, 

                                    });
                                }
                            });
                        }
                    });         
                });
            });
        } else {
            res.json({ 
                error: 'ResultNotFound',
                config: configPath
            });
        }
    });
	
});

module.exports = router;
