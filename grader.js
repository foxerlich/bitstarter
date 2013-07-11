#!/usr/bin/env node
/*
Automatically grade files for the presence of the specified HTML tags/attribute.
Uses commander.js and cheerio. Teaches command line application development and basic DOM parsing.

References:

+ cheerio
    - https://github.com/MatthewMueller/cheerio
    - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
    - http://maxogden.com/scraping-with-node-html
    
+ commander
    - https://github.com/visionmedia/commander.js
    - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy
    
+ JSON
    - http://en.wikipedia.org/wiki/JSON
    - https://developer.mozilla.org/en-US/docs/JSON
    - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2

+ restler    
    - https://github.com/danwrong/restler
*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var URLFILE_DEFAULT = "http://infinite-inlet-7936.herokuapp.com/";
 
var assertFileExists = function(infile) {
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exitin.", instr);
        process.exit(1); //http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};

//Check that URL connection exists and it is index.html. Not written.
var assertURLConnection = function(){};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

//modified from checkHtmlFile to take a general cheerioIndexFile set up by cheerio in main if/else
var checkIndexFile = function(cheerioIndexFile, checksfile) {
    $ = cheerioIndexFile;//modified so no function call
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]]= present;
    }
    return out;
};

if(require.main == module) {
    program
        .option('-c, --checks', 'Path to checks.jsom', assertFileExists, CHECKSFILE_DEFAULT)
        .option('-f, --file','Path to index.html', assertFileExists, HTMLFILE_DEFAULT)
        .option('-u, --url', 'Path to index.html at url', assertURLConnection, URLFILE_DEFAULT)//added
        .parse(process.argv);
    if(program.url){                        //set up if/else for different cheerio processing of rest.get and html file in directory
	var indexURL = rest.get(program.url).on('complete', function(result) {
	    return result
});
	var cheerioIndexFile = function(indexURL) {
	    return cheerio.load(indexURL)};
}else if (program.file) {    
        var cheerioIndexFile = cheerio.load(fs.readFileSync(program.file));
}
     var checkJson = checkIndexFile(cheerioIndexFile, program.checks);//changed naming
     var outJson = JSON.stringify(checkJson, null, 4);
     console.log(outJson);
}
else{
exports.checkIndexFile = checkIndexFile;
}
