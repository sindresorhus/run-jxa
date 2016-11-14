import test from 'ava';
import m from './';

test('runJxa() - function', async t => {
	const res = await m((a, b) => {
		console.log('log');
		return `${b}-${a}`;
	}, ['🦄', '🐴']);

	t.is(res, '🐴-🦄');
});

test('runJxa() - function - no arguments', async t => {
	t.is(await m(() => '🦄'), '🦄');
});

test('runJxa() - string', async t => {
	const res = await m(`
		const a = args[0];
		const b = args[1];
		return \`\${b}-\${a}\`;
	`, ['🦄', '🐴']);

	t.is(res, '🐴-🦄');
});

test('runJxa.sync()', async t => {
	t.is(m.sync((a, b) => `${b}-${a}`, ['🦄', '🐴']), '🐴-🦄');
});
