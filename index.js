'use strict';
const os = require('os');
const execa = require('execa');
const Subsume = require('subsume');

const yosemiteOrHigher = process.platform === 'darwin' && Number(os.release().split('.')[0]) >= 14;
const subsume = new Subsume();
const cmdArgs = ['-l', 'JavaScript'];
const osErrMsg = 'Requires macOS Yosemite or higher';

const prepareOpts = (input, args) => {
	const stringTpl = `function(){const args=[].slice.call(arguments);\n${input}\n}`;
	const fnStr = typeof input === 'function' ? input.toString() : stringTpl;
	const argsStr = (args || []).map(JSON.stringify).join(',');
	const fnCall = `(${fnStr})(${argsStr})`;
	const output = `JSON.stringify({data: ${fnCall}})`;
	const script = `console.log('${subsume.prefix}' + ${output} + '${subsume.postfix}');`;
	return {input: script};
};

const handleOutput = str => {
	const res = subsume.parse(str);
	const log = res.rest.slice(0, -1);

	if (log.length > 0) {
		console.log(log);
	}

	return res.data && JSON.parse(res.data).data;
};

module.exports = (input, args) => {
	if (!yosemiteOrHigher) {
		return Promise.reject(new Error(osErrMsg));
	}

	return execa.stderr('osascript', cmdArgs, prepareOpts(input, args)).then(handleOutput);
};

module.exports.sync = (input, args) => {
	if (!yosemiteOrHigher) {
		throw new Error(osErrMsg);
	}

	return handleOutput(execa.sync('osascript', cmdArgs, prepareOpts(input, args)).stderr);
};
