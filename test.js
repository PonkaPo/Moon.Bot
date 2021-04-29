var fs = require('fs');
var path = require('path');
var config = require('./config.json');
const replaceJSONProperty = require('replace-json-property');
const Integer = require('integer');

fs.readFile('number.txt', 'utf8', function readFileCallback(err, data){
    if (err){
		console.log(err);
    } else {
        var cnumberINt = Integer(data);
		cnumberINt = cnumberINt + 1
        filename = 'downloaded_meme_' + cnumberINt;
		console.log('\nInteger: ' + cnumberINt + '\nFilename: ' + filename);
		fs.writeFile('number.txt', cnumberINt.toString(), (err) => {
			if (err) throw err;
			console.log('Saved!');
		});
    }});