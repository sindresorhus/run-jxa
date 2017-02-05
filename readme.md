# run-jxa [![Build Status](https://travis-ci.org/sindresorhus/run-jxa.svg?branch=master)](https://travis-ci.org/sindresorhus/run-jxa)

> Run [JXA](https://github.com/dtinth/JXA-Cookbook/wiki) *(macOS JavaScript for Automation)* code and get the result

*Requires macOS 10.10 or later.*


## Install

```
$ npm install --save run-jxa
```


## Usage

Use a function:

```js
const runJxa = require('run-jxa');

runJxa((unicorn, horse) => {
	// this is run in the JXA engine
	return `I love ${unicorn} & ${horse}`;
}, ['🦄', '🐴']).then(result => {
	console.log(result);
	//=> 'I love 🦄 & 🐴'
});
```

Or a string:

```js
const runJxa = require('run-jxa');

runJxa(`
	const [unicorn, horse] = args;
	return \`I love \${unicorn} & \${horse}\`;
`, ['🦄', '🐴']).then(result => {
	console.log(result);
	//=> 'I love 🦄 & 🐴'
});
```


## runJxa(input, [arguments])

Returns a `Promise` for the value returned from `input`.

## runJxa.sync(input, [arguments])

Returns the value returned from `input`.

### input

Type: `Function` `string`

If a function, it's stringified and passed to JXA. It should be atomic, meaning it doesn't access anything outside its body.

If a string, you can access the specified arguments with `args` array. Use the `arguments` parameter rather than template interpolation so you don't have to do escaping.

You can `console.log` inside `input`. It will be forwarded to stdout. Useful for debugging.

Note: The JXA context is completely synchronous, so asynchronous functions like `setTimeout` are not available.

### arguments

Type: `Array`

Arguments to pass to the JXA context. Items should be serializable (`JSON.stringify`'able).


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
