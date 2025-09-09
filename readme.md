# run-jxa

> Run [JXA](https://github.com/dtinth/JXA-Cookbook) code and get the result

*JXA is JavaScript for Automation on macOS. Requires macOS 10.10 or later.*

## Install

```sh
npm install run-jxa
```

## Usage

Use a function:

```js
import {runJxa} from 'run-jxa';

const result = await runJxa((unicorn, horse) => {
	// This is run in the JXA engine
	return `I love ${unicorn} & ${horse}`;
}, ['🦄', '🐴']);

console.log(result);
//=> 'I love 🦄 & 🐴'
```

Or a string:

```js
import {runJxa} from 'run-jxa';

const result = await runJxa(`
	const [unicorn, horse] = args;
	return \`I love \${unicorn} & \${horse}\`;
`, ['🦄', '🐴']);

console.log(result);
//=> 'I love 🦄 & 🐴'
```

Cancel a long-running script:

```js
import {runJxa} from 'run-jxa';

const controller = new AbortController();

// Cancel after 5 seconds
setTimeout(() => {
	controller.abort();
}, 5000);

try {
	const result = await runJxa(() => {
		// Some potentially long-running operation
		const app = Application('Finder');
		return app.windows.length;
	}, undefined, {signal: controller.signal});
	
	console.log(result);
} catch (error) {
	if (error.name === 'AbortError') {
		console.log('Script was cancelled');
	}
}
```

## API

### runJxa(input, arguments?, options?)

Returns a `Promise` for the value returned from `input`.

### runJxaSync(input, arguments?)

Returns the value returned from `input`.

#### input

Type: `Function | string`

If a function, it's stringified and passed to JXA. It should be [pure](https://en.wikipedia.org/wiki/Pure_function), meaning it doesn't access anything outside its body.

If a string, you can access the specified arguments with `args` array. Use the `arguments` parameter rather than template interpolation so you don't have to do escaping.

You can `console.log` inside `input`. It will be forwarded to stdout. Useful for debugging.

Note: The JXA context is completely synchronous, so asynchronous functions like `setTimeout` are not available.

#### arguments

Type: `unknown[]`

Arguments to pass to the JXA context.

Items should be serializable (`JSON.stringify`'able).

#### options

Type: `object`

##### signal

Type: `AbortSignal`

An [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can be used to cancel the JXA execution.

Only supported by the async `runJxa()` function, not the sync version.

## Related

- [is-jxa](https://github.com/sindresorhus/is-jxa) - Check if your code is running in a JXA environment
