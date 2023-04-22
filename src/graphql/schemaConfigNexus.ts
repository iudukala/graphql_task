import { join } from 'path';
import { makeSchema } from 'nexus';
import * as nexusTypes from './index.js';
import { getDirectoryPath } from './dirnameESM.js';

// refactored out as function to mock during testing; jest has no esm support
const DIRPATH = getDirectoryPath();

const AUTOGEN_DIR_PATH = join('..', 'infrastructure', 'nexus_autogen_artifacts');

export const nexusSchema = makeSchema({
	types: nexusTypes,

	outputs: {
		typegen: join(DIRPATH, AUTOGEN_DIR_PATH, 'nexus_typegen.ts'),
		schema: join(DIRPATH, AUTOGEN_DIR_PATH, 'schema.graphql'),
	},
	contextType: {
		module: join(DIRPATH, 'common', 'type_GQLContextType.ts'),
		export: 'GQLContextType',
	},
	shouldGenerateArtifacts: false,

	// prettier config to apply to output artifacts
	prettierConfig: join(DIRPATH, '../../.prettierrc'),
});
