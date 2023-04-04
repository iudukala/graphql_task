import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import GQLNXSchema from './graphql/schema_graphql_nexus';
import { NexusGenObjects } from './graphql/nexus_autogen/nexus-typegen';
import { GQLType } from './graphql/constants/enum_nexusTypeKey';
import { gqlContext } from './graphql/gql_context';

export type GQLContextType = {
	fruits: Array<NexusGenObjects[GQLType.Fruit]>;
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
