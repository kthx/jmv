var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var exec = require('child_process').exec
var fs = require('fs');
var unzip = require('unzip');

var randomString = function (len, bits)
{
    bits = bits || 36;
    var outStr = "", newStr;
    while (outStr.length < len)
    {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toUpperCase();
};

router.post("/", function(req, res) {    
	var currentFolder = randomString(12);
	if(req.files) {

		mkdirp('./results/' + currentFolder + '/files/', function(err) {   
			fs.rename(req.files.file.path, './results/' + currentFolder + '/files/' + req.files.file.originalname, function(){
				mkdirp('./results/' + currentFolder + '/checkstyle/', function(err) {  
					if(req.files.file.extension === 'zip') {
						fs.createReadStream('./results/' + currentFolder + '/files/' + req.files.file.originalname)
						.pipe(unzip.Extract({ path: './results/' + currentFolder + '/files/'  }))
						.on('finish', function(){
							fs.unlink('./results/' + currentFolder + '/files/' + req.files.file.originalname, function (err) {
								if (err) throw err;
							  	console.log('successfully deleted ./results/' + currentFolder + '/files/' + req.files.file.originalname);
							  	exec('/usr/bin/checkstyle -c ' + cwd + '/config/checkstyle_config.xml -f xml -o ' 
									+ process.cwd() + '/results/' + currentFolder + '/checkstyle/output.xml  \-r ' 
									+ process.cwd() + '/results/' + currentFolder + '/files/', function (error, stdout, stderr) {
										//req.session.lastResult = currentFolder;
							  			res.json({ path: currentFolder }); 
							  			res.end();
								});
							});
							
						});
					} else{
						exec('/usr/bin/checkstyle -c ' + cwd + '/config/checkstyle_config.xml -f xml -o ' 
							+ process.cwd() + '/results/' + currentFolder + '/checkstyle/output.xml  \-r ' 
							+ process.cwd() + '/results/' + currentFolder + '/files/', function (error, stdout, stderr) {
								//req.session.lastResult = currentFolder;
					  			console.log(stdout);
					  			res.json({ path: currentFolder });
					  			res.end();     
						});
					}
					
				});
			});
		});    
	}                                  
                                         
}); 

module.exports = router;
