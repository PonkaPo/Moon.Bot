var fs = require('fs');
var path = require('path');
var files = fs.readdirSync('./memes-command/');

var result = files[between(1, files.length)]
console.log(result);
var ext = path.extname('./memes-command/' + result);
console.log(ext);

function between(min, max) {  
	return Math.floor(
	  Math.random() * (max - min + 1) + min
	)
}