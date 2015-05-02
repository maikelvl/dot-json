#!/usr/bin/env node

'use strict';

var dot_json = require('../')
	,fs = require('fs')
	,path = require('path')
	,docopt = require('docopt').docopt
	,package_ = require('../package.json')
	;

var usage = [
	'<file> <key-path>',
	'<file> <key-path> <value>',
	'<file> <key-path> --delete',
];

var options = [
	'-d --delete     Delete the key-path',
	'-h --help       Show this message with options',
	'-v --version    Print the version number',
];

var name = path.basename(__filename, '.js');
var args = docopt('Usage:\n  '+name+' '+usage.join('\n  '+name+' ')+'\n\nOptions:\n  '+options.join('\n  '), {
	version: package_.version
});

try {
	if (args['<value>']) {
		dot_json.file(args['<file>']).set(args['<key-path>'], args['<value>']);
	}
	else if (args['--delete']) {
		dot_json.file(args['<file>']).delete(args['<key-path>']);
	}
	else {
		dot_json.file(args['<file>']).get(args['<key-path>'], function(object){
			console.log(object);
		});
	}
}
catch (e) {
	if(e.name === 'SyntaxError') {
		console.error("There is a syntax error in "+args['<file>']+": "+e.message);
	}
	else if(e.code === 'ENOENT' && e.path) {
		console.error("File not found: "+e.path);
	}
	else {
		console.error(e);
	}
	process.exit(1);
}
process.exit(0);