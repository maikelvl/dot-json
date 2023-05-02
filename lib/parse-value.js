var util = require('util');

module.exports = function parseValue(value, parseAsJson) {
	if (parseAsJson) {
		try {
			return JSON.parse(value)
		} catch (error) {
			throw new Error(
				util.format(
					'The received value cannot be parsed as a JSON string. Executed:\n'
					+ 'JSON.parse(%j).\n'
					+ 'You might want to wrap the string in single quotes, for example:\n'
					+ 'dot-json file.json key \'{"value": 42}\' --json-value',
					value
				)
			)
		}
	}

	switch(value) {
		case 'true':
			return true;
		case 'false':
			return false;
		case 'undefined':
			return undefined;
		case 'null':
			return null;
	}

	if (value == parseInt(value)) {
		return parseInt(value);
	}

	if(value == parseFloat(value)) {
		return parseFloat(value);
	}

	return value;
}
