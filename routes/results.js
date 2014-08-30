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
    fs.exists(cwd+ '/results/' + resultId + '/checkstyle/output.xml', function(exists) {
        if (exists) {
            fs.readFile( cwd+ '/results/' + resultId + '/checkstyle/output.xml', function(err, data) {
                parser.parseString(data, function (err, checkstyleResults) {
                    checkstyleResults.checkstyle.file.forEach(function(item, index, array){
                        if(item.$.name.endsWith('.java')) {
                            console.log(item.$.name);
                            results[item.$.name.replace(cwd + '/results/' + resultId + '/files/', '')] = {};
                            results[item.$.name.replace(cwd + '/results/' + resultId + '/files/', '')].source = [];

                            lineReader.eachLine(item.$.name, function(line, last) {
                                console.log(line);
                                results[item.$.name.replace(cwd + '/results/' + resultId + '/files/', '')].source.push(line);
                                if(last && (index === array.length - 1)){
                                    console.dir(results);
                                    console.log('Done');
                                    res.json({ 
                                        currentUrl: '/results/' + resultId,
                                        title: 'JVM Results', 
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
                error: 'ResultNotFound'
            });
        }
    });
	
});

module.exports = router;
