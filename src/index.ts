import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import GQLNXSchema from './graphql/schema_graphql_nexus';
import { tempDataFruit } from './tempData';
import { NexusGenObjects } from './graphql/nexus_autogen/nexus-typegen';
import { GQLNexusTypeName } from './graphql/enum_nexus_type_keys';

export type GQLContextType = {
	fruits: Array<NexusGenObjects[GQLNexusTypeName.Fruit]>;
};

express()
	.use(
		'/graphql',
		graphqlHTTP({
			schema: GQLNXSchema,
			graphiql: true,
			context: <GQLContextType>{
				fruits: tempDataFruit,
			},
			pretty: false,
		}),
	)
	.listen(4000);

console.log('running on :4000/graphql');
