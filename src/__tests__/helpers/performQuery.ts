import { graphql } from 'graphql';
import { nexusSchema } from '../../graphql/schemaConfigNexus.js';
import { TEST_DB_URI_IDENTIFIER } from './setupTestEnvironment.js';

export const perfromQuery = (query: string) =>
	graphql({
		schema: nexusSchema,
		source: query,
		contextValue: {
			DB_URI: process.env[TEST_DB_URI_IDENTIFIER],
		},
	});
