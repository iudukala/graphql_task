import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import GQLNXSchema from './graphql/schema_graphql_nexus';
import { NexusGenObjects } from './graphql/nexus_autogen/nexus-typegen';
import { GQLNexusTypeName } from './graphql/enum_nexus_type_keys';
import { gqlContext } from './gql_context';

export type GQLContextType = {
	fruits: Array<NexusGenObjects[GQLNexusTypeName.Fruit]>;
};

express()
	.use(
		'/graphql',
		graphqlHTTP({
			schema: GQLNXSchema,
			graphiql: true,
			context: gqlContext,
			pretty: false,
		}),
	)
	.listen(4000);

console.log('running on :4000/graphql');
