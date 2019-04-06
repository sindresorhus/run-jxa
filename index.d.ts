import {JsonValue} from 'type-fest';

declare const runJxa: {
	/**
	Run [JXA](https://github.com/dtinth/JXA-Cookbook) code and get the result.

	@param input - If a function, it's stringified and passed to JXA. It should be [pure](https://en.wikipedia.org/wiki/Pure_function), meaning it doesn't access anything outside its body.

	If a string, you can access the specified arguments with `args` array. Use the `arguments` parameter rather than template interpolation so you don't have to do escaping.

	You can `console.log` inside `input`. It will be forwarded to stdout. Useful for debugging.

	Note: The JXA context is completely synchronous, so asynchronous functions like `setTimeout` are not available.
	@param arguments - Arguments to pass to the JXA context. Items should be serializable (`JSON.stringify`'able).
	@returns The value returned from input.

	@example
	```
	import runJxa = require('run-jxa');

	(async () => {
		const functionResult = await runJxa((unicorn, horse) => {
			// This is run in the JXA engine
			return `I love ${unicorn} & ${horse}`;
		}, ['🦄', '🐴']);

		console.log(functionResult);
		//=> 'I love 🦄 & 🐴'

		const stringResult = await runJxa(`
			const [unicorn, horse] = args;
			return \`I love \${unicorn} & \${horse}\`;
		`, ['🦄', '🐴']);

		console.log(stringResult);
		//=> 'I love 🦄 & 🐴'
	})();
	```
	*/
	<ReturnType extends JsonValue>(
		input: string | ((...args: JsonValue[]) => ReturnType),
		arguments?: JsonValue[]
	): Promise<ReturnType>;

	/**
	Synchronously run [JXA](https://github.com/dtinth/JXA-Cookbook) code and get the result.

	@param input - If a function, it's stringified and passed to JXA. It should be [pure](https://en.wikipedia.org/wiki/Pure_function), meaning it doesn't access anything outside its body.

	If a string, you can access the specified arguments with `args` array. Use the `arguments` parameter rather than template interpolation so you don't have to do escaping.

	You can `console.log` inside `input`. It will be forwarded to stdout. Useful for debugging.

	Note: The JXA context is completely synchronous, so asynchronous functions like `setTimeout` are not available.
	@param arguments - Arguments to pass to the JXA context. Items should be serializable (`JSON.stringify`'able).
	@returns The value returned from input.
	*/
	sync<ReturnType extends JsonValue>(
		input: string | ((...args: JsonValue[]) => ReturnType),
		arguments?: JsonValue[]
	): ReturnType;
};

export = runJxa;
