import { makeSchema } from 'nexus';
import { join } from 'path';
import * as nexusTypes from './nexus_types';

const AUTOGEN_DIR = 'nexus_autogen';

const nexusSchema = makeSchema({
	types: nexusTypes,
	outputs: {
		typegen: join(__dirname, AUTOGEN_DIR, 'nexus-typegen.ts'),
		schema: join(__dirname, AUTOGEN_DIR, 'schema.graphql'),
	},

	// prettier config to apply to output artifacts
	prettierConfig: join(__dirname, '../../.prettierrc'),
});

export default nexusSchema;
