import { makeSchema } from 'nexus';
import { join } from 'path';
import * as nexusTypes from '.';

const AUTOGEN_DIR = join(__dirname, 'nexus_autogen');
const nexusSchema = makeSchema({
	types: nexusTypes,
	outputs: {
		typegen: join(AUTOGEN_DIR, 'nexus-typegen.ts'),
		schema: join(AUTOGEN_DIR, 'schema.graphql'),
	},
	contextType: {
		module: join(__dirname, 'gqlContext.ts'),
		export: 'context',
	},

	// prettier config to apply to output artifacts
	prettierConfig: join(__dirname, '../../.prettierrc'),
});

export default nexusSchema;
