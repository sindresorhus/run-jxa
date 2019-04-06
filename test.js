import test from 'ava';
import runJxa from '.';

test('runJxa() - function', async t => {
	const result = await runJxa((a, b) => {
		console.log('log');
		return `${b}-${a}`;
	}, ['🦄', '🐴']);

	t.is(result, '🐴-🦄');
});

test('runJxa() - function - no arguments', async t => {
	t.is(await runJxa(() => '🦄'), '🦄');
});

test('runJxa() - string', async t => {
	const result = await runJxa(`
		const a = args[0];
		const b = args[1];
		return \`\${b}-\${a}\`;
	`, ['🦄', '🐴']);

	t.is(result, '🐴-🦄');
});

test('runJxa.sync()', t => {
	t.is(runJxa.sync((a, b) => `${b}-${a}`, ['🦄', '🐴']), '🐴-🦄');
});
