var fs = require('fs');
var keypath = require('underscore-keypath');
var json_file;

exports.file = function(file) {
	json_file = file;
	return exports;
}

exports.set = function(key_path, value, callback) {
	try {
		readJson(json_file, function(object){
			setValueForKeyPath(object, key_path, value);
			writeJson(json_file, object, callback);
		});
	}
	catch(e) {
		if (e.code === 'ENOENT' && e.path) {
			var object = {};
			setValueForKeyPath(object, key_path, value);
			writeJson(json_file, object, callback);
		}
	}
}

exports.get = function(key_path, callback) {
	readJson(json_file, function(object){
		callback(keypath(object).valueForKeyPath(key_path));
	});
}

exports.delete = function(key_path, callback) {
	if (typeof callback != 'function') {
		callback = function() {};
	}
	readJson(json_file, function(object){
		if ( ! keypath(object).hasKeyPath(key_path)) {
			callback();
			return;
		}
		deleteValueForKeyPath(object, key_path);
		writeJson(json_file, object, callback);
	});
}

function setValueForKeyPath(object, key_path, value) {
	var key_array = key_path.split('.');
	var key_path_array = [];
	for (i in key_array) {
		if (i < key_array.length - 1) {
			key_path_array.push(key_array[i]);
			var path = key_path_array.join('.');
			if ( ! keypath(object).hasKeyPath(path) || typeof keypath(object).valueForKeyPath(path) !== 'object') {
				keypath(object).setValueForKeyPath(path, {});
			}
			continue;
		}
		return keypath(object).setValueForKeyPath(key_path, value);
	}
	return object;
}

function deleteValueForKeyPath(object, key_path) {
	var key_array = key_path.split('.');
	if (key_array.length > 1) {
		var top = key_array.pop(key_array);
		var base = key_array.join('.');
		var part = keypath(object).valueForKeyPath(base);
		delete part[top];
		keypath(object).setValueForKeyPath(base, part);
	}
	else {
		delete object[key_path];
	}
	
	return object;
}

function readJson(json_file, callback) {
	callback(JSON.parse(fs.readFileSync(json_file)));
}

function writeJson(json_file, object, callback) {
	if (typeof callback != 'function') {
		callback = function() {};
	}
	var content = JSON.stringify(object, null, '  ');
	fs.writeFileSync(json_file, content);
	callback();
}