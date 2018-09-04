import {expectType} from 'tsd-check';
import m from '.';

(async () => {
    expectType<void>(await m((a, b) => {
		console.log('log');
		return `${b}-${a}`;
    }, ['🦄', '🐴']));
})

expectType<void>(m.sync((a, b) => {
    console.log('log');
    return `${b}-${a}`;
}, ['🦄', '🐴']));