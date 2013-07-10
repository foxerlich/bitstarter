var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";

var assertFileExists = function(infile) {
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exitin.", instr);
        process.exit(1); //http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};

var cheerioHtmlFile = function(htmlFile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};

var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlFile);
    var checks = loadChecks(checkfile).sort();
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
        .parse(process.arv);
    var checkJson = checkHtmlFile(program.file, program.checks);
    var outJson = JSON.stringify(checkJson, null, 4);
    console.log(outJson);
}else {
    exports.checkHtmlFile = checkHtmlFile;
}
