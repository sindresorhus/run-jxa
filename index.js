'use strict';
const execa = require('execa');
const Subsume = require('subsume');
const macosVersion = require('macos-version');

const subsume = new Subsume();
const commandArguments = ['-l', 'JavaScript'];

const prepareOptions = (input, arguments_) => {
	const stringTpl = `function(){const args=[].slice.call(arguments);\n${input}\n}`;
	const fnStr = typeof input === 'function' ? input.toString() : stringTpl;
	const argsStr = (arguments_ || []).map(JSON.stringify).join(',');
	const fnCall = `(${fnStr})(${argsStr})`;
	const output = `JSON.stringify({data: ${fnCall}})`;
	const script = `console.log('${subsume.prefix}' + ${output} + '${subsume.postfix}');`;
	return {input: script};
};

const handleOutput = string => {
	const result = subsume.parse(string);
	const log = result.rest.slice(0, -1);

	if (log.length > 0) {
		console.log(log);
	}

	return result.data && JSON.parse(result.data).data;
};

module.exports = async (input, arguments_) => {
	macosVersion.assertGreaterThanOrEqualTo('10.10');
	const {stderr} = await execa('osascript', commandArguments, prepareOptions(input, arguments_));
	return handleOutput(stderr);
};

module.exports.sync = (input, arguments_) => {
	macosVersion.assertGreaterThanOrEqualTo('10.10');
	const {stderr} = execa.sync('osascript', commandArguments, prepareOptions(input, arguments_));
	return handleOutput(stderr);
};
