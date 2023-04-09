import { join } from 'path';
import { makeSchema } from 'nexus';
import * as nexusTypes from './index.js';

import { fileURLToPath } from 'url';

const __dirname2 = (():string => {
	try {
		console.log(__dirname);
		return __dirname;
	}
	catch (e) {
		return fileURLToPath(new URL('.', import.meta.url));
	}
})();


const NEXUS_AUTOGEN_DIR_NAME = 'nexus_autogen_artifacts';

export const nexusSchema = makeSchema({
	types: nexusTypes,

	outputs: {
		typegen: join(__dirname2, NEXUS_AUTOGEN_DIR_NAME, 'nexus_typegen.ts'),
		schema: join(__dirname2, NEXUS_AUTOGEN_DIR_NAME, 'schema.graphql'),
	},
	contextType: {
		module: join(__dirname2, 'contextGQL.ts'),
		export: 'contextGQL',
	},
	shouldGenerateArtifacts: true,

	// prettier config to apply to output artifacts
	prettierConfig: join(__dirname2, '../../.prettierrc'),
});
