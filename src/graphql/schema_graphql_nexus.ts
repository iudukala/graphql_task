import { makeSchema } from 'nexus';
import { join } from 'path';
import * as nexusTypes from '.';

import { NEXUS_AUTOGEN_DIR_NAME } from '../globals/NEXUS_AUTOGEN_DIR';
import { NEXUS_ARTIFACT_TYPE_NAME } from '../globals/NEXUS_ARTIFACT_TYPE_NAME';

// switch to dynamic import for context file as well

const nexusSchema = makeSchema({
	types: nexusTypes,
	outputs: {
		typegen: join(__dirname, NEXUS_AUTOGEN_DIR_NAME, NEXUS_ARTIFACT_TYPE_NAME),
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
