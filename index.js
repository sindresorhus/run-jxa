import {execa, execaSync} from 'execa';
import Subsume from 'subsume';
import {assertMacOSVersionGreaterThanOrEqualTo} from 'macos-version';

const subsume = new Subsume();
const commandArguments = ['-l', 'JavaScript'];

const prepareOptions = (input, arguments_, options = {}) => {
	const stringTemplate = `function(){const args=[].slice.call(arguments);\n${input}\n}`;
	const functionString = typeof input === 'function' ? input.toString() : stringTemplate;
	const argsString = (arguments_ || []).map(argument => JSON.stringify(argument)).join(',');
	const functionCall = `(${functionString})(${argsString})`;
	const output = `JSON.stringify({data: ${functionCall}})`;
	const script = `console.log('${subsume.prefix}' + ${output} + '${subsume.postfix}');`;
	const execOptions = {input: script};

	if (options.signal) {
		execOptions.cancelSignal = options.signal;
	}

	return execOptions;
};

const handleOutput = string => {
	const result = subsume.parse(string);
	const log = result.rest.slice(0, -1);

	if (log.length > 0) {
		console.log(log);
	}

	return result.data && JSON.parse(result.data).data;
};

export async function runJxa(input, arguments_, options) {
	assertMacOSVersionGreaterThanOrEqualTo('10.10');
	const {stderr} = await execa('osascript', commandArguments, prepareOptions(input, arguments_, options));
	return handleOutput(stderr);
}

export function runJxaSync(input, arguments_) {
	assertMacOSVersionGreaterThanOrEqualTo('10.10');
	const {stderr} = execaSync('osascript', commandArguments, prepareOptions(input, arguments_));
	return handleOutput(stderr);
}
