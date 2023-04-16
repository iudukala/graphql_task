import { contextGQL } from '../../graphql/common/contextGQL.js';
import { nexusSchema } from '../../graphql/schemaConfigNexus.js';
import { graphql } from 'graphql';

export const perfromQuery = (query: string) =>
	graphql({
		schema: nexusSchema,
		source: query,
		contextValue: contextGQL,
	});
