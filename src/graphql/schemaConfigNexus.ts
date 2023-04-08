import { join } from 'path';
import { makeSchema } from 'nexus';
import * as nexusTypes from './index.js';

import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const NEXUS_AUTOGEN_DIR_NAME = 'nexus_autogen_artifacts';

export const nexusSchema = makeSchema({
	types: nexusTypes,
	outputs: {
		typegen: join(__dirname, NEXUS_AUTOGEN_DIR_NAME, 'nexus_typegen.ts'),
		schema: join(__dirname, NEXUS_AUTOGEN_DIR_NAME, 'schema.graphql'),
	},
	contextType: {
		module: join(__dirname, 'contextGQL.ts'),
		export: 'context',
	},

	// prettier config to apply to output artifacts
	prettierConfig: join(__dirname, '../../.prettierrc'),
});
