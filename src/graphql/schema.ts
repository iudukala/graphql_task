import { makeSchema } from 'nexus';
import { join } from 'path';

import { Fruit } from './Fruit';

const AUTOGEN_DIR = 'nexus_autogen';

export default makeSchema({
	types: [Fruit],
	outputs: {
		typegen: join(__dirname, AUTOGEN_DIR, 'nexus-typegen.ts'),
		schema: join(__dirname, AUTOGEN_DIR, 'schema.graphql'),
	},
});
