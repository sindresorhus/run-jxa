import {expectType} from 'tsd';
import {JsonValue} from 'type-fest';
import runJxa = require('.');

expectType<Promise<string>>(
	runJxa(
		(unicorn, horse) => {
			return `I love ${unicorn} & ${horse}`;
		},
		['🦄', '🐴']
	)
);
expectType<Promise<JsonValue>>(
	runJxa(
		`
		const [unicorn, horse] = args;
		return \`I love \${unicorn} & \${horse}\`;
	`,
		['🦄', '🐴']
	)
);
expectType<string>(
	runJxa.sync(
		(unicorn, horse) => {
			return `I love ${unicorn} & ${horse}`;
		},
		['🦄', '🐴']
	)
);
expectType<JsonValue>(
	runJxa.sync(
		`
		const [unicorn, horse] = args;
		return \`I love \${unicorn} & \${horse}\`;
	`,
		['🦄', '🐴']
	)
);
