'use strict';
const execa = require('execa');
const Subsume = require('subsume');
const macosVersion = require('macos-version');

const subsume = new Subsume();
const cmdArgs = ['-l', 'JavaScript'];

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

module.exports = (input, args) => Promise.resolve().then(() => {
	macosVersion.assertGreaterThanOrEqualTo('10.10');
	return execa.stderr('osascript', cmdArgs, prepareOpts(input, args)).then(handleOutput);
});

module.exports.sync = (input, args) => {
	macosVersion.assertGreaterThanOrEqualTo('10.10');
	return handleOutput(execa.sync('osascript', cmdArgs, prepareOpts(input, args)).stderr);
};
