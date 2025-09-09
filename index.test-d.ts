import {expectType, expectAssignable} from 'tsd';
import {type JsonValue} from 'type-fest';
import {runJxa, runJxaSync} from './index.js';

expectAssignable<Promise<string>>(runJxa(
	(unicorn, horse) => `I love ${unicorn} & ${horse}`,
	['🦄', '🐴'],
));

expectType<Promise<JsonValue>>(runJxa(
	`
		const [unicorn, horse] = args;
		return \`I love \${unicorn} & \${horse}\`;
	`,
	['🦄', '🐴'],
));

expectAssignable<string>(runJxaSync(
	(unicorn, horse) => `I love ${unicorn} & ${horse}`,
	['🦄', '🐴'],
));

expectType<JsonValue>(runJxaSync(
	`
		const [unicorn, horse] = args;
		return \`I love \${unicorn} & \${horse}\`;
	`,
	['🦄', '🐴'],
));
