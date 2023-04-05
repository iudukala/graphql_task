import { join } from 'path';
import { makeSchema } from 'nexus';
import * as nexusTypes from '.';

const NEXUS_AUTOGEN_DIR_NAME = 'nexus_autogen_artifacts';

const nexusSchema = makeSchema({
	types: nexusTypes,
	outputs: {
		typegen: join(__dirname, NEXUS_AUTOGEN_DIR_NAME, 'nexus_typegen.ts'),
		schema: join(__dirname, NEXUS_AUTOGEN_DIR_NAME, 'schema.graphql'),
	},
	contextType: {
		module: join(__dirname, 'gqlContext.ts'),
		export: 'context',
	},

	// prettier config to apply to output artifacts
	prettierConfig: join(__dirname, '../../.prettierrc'),
});

export default nexusSchema;
