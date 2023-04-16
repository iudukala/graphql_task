import { join } from 'path';
import { makeSchema } from 'nexus';
import * as nexusTypes from './index.js';
import { getDirname } from './dirnameESM.js';

const NEXUS_AUTOGEN_DIR_NAME = 'nexus_autogen_artifacts';

// refactored out as function to mock during testing; jest has no esm support
const DIRNAME = getDirname();

export const nexusSchema = makeSchema({
	types: nexusTypes,

	outputs: {
		typegen: join(DIRNAME, NEXUS_AUTOGEN_DIR_NAME, 'nexus_typegen.ts'),
		schema: join(DIRNAME, NEXUS_AUTOGEN_DIR_NAME, 'schema.graphql'),
	},
	contextType: {
		module: join(DIRNAME, 'common', 'type_GQLContextType.ts'),
		export: 'GQLContextType',
	},
	shouldGenerateArtifacts: false,

	// prettier config to apply to output artifacts
	prettierConfig: join(DIRNAME, '../../.prettierrc'),
});
