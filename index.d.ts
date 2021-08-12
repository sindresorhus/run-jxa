import {JsonValue} from 'type-fest';

/**
Run [JXA](https://github.com/dtinth/JXA-Cookbook) code and get the result.

@param input - If a function, it's stringified and passed to JXA. It should be [pure](https://en.wikipedia.org/wiki/Pure_function), meaning it doesn't access anything outside its body.

If a string, you can access the specified arguments with `args` array. Use the `arguments` parameter rather than template interpolation so you don't have to do escaping.

You can `console.log` inside `input`. It will be forwarded to stdout. Useful for debugging.

Note: The JXA context is completely synchronous, so asynchronous functions like `setTimeout` are not available.
@param arguments - Arguments to pass to the JXA context. Items should be serializable (`JSON.stringify`'able).
@returns The value returned from `input`.

@example
```
import {runJxa} from 'run-jxa';

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
```
*/
export function runJxa<ReturnType extends JsonValue, ArgumentsType extends readonly JsonValue[]>(
	input: string | ((...args: ArgumentsType) => ReturnType),
	arguments?: ArgumentsType
): Promise<ReturnType>;

/**
Synchronously run [JXA](https://github.com/dtinth/JXA-Cookbook) code and get the result.

@param input - If a function, it's stringified and passed to JXA. It should be [pure](https://en.wikipedia.org/wiki/Pure_function), meaning it doesn't access anything outside its body.

If a string, you can access the specified arguments with `args` array. Use the `arguments` parameter rather than template interpolation so you don't have to do escaping.

You can `console.log` inside `input`. It will be forwarded to stdout. Useful for debugging.

Note: The JXA context is completely synchronous, so asynchronous functions like `setTimeout` are not available.
@param arguments - Arguments to pass to the JXA context. Items should be serializable (`JSON.stringify`'able).
@returns The value returned from `input`.

@example
```
import {runJxaSync} from 'run-jxa';

const functionResult = runJxaSync((unicorn, horse) => {
	// This is run in the JXA engine
	return `I love ${unicorn} & ${horse}`;
}, ['🦄', '🐴']);

console.log(functionResult);
//=> 'I love 🦄 & 🐴'

const stringResult = runJxaSync(`
	const [unicorn, horse] = args;
	return \`I love \${unicorn} & \${horse}\`;
`, ['🦄', '🐴']);

console.log(stringResult);
//=> 'I love 🦄 & 🐴'
```
*/
export function runJxaSync<ReturnType extends JsonValue, ArgumentsType extends readonly JsonValue[]>(
	input: string | ((...args: ArgumentsType) => ReturnType),
	arguments?: ArgumentsType
): ReturnType;
