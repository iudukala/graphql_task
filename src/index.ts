import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import GQLNXSchema from './graphql/schema_graphql_nexus';
import { tempDataFruit } from './tempData';
import { NexusGenObjects } from './graphql/nexus_autogen/nexus-typegen';
import { GQLNexusTypeName } from './graphql/enum_nexus_type_keys';

export type GQLContextType = {
	fruits: Array<NexusGenObjects[GQLNexusTypeName.Fruit]>;
};

const root = {
	hello: () => {
		return 'hello world';
	},

	fruits: (parent: Record<string, never>, args: Record<string, never>, context: GQLContextType) => {
		// console.log(context.fruits);
		// console.log(tempDataFruit);
		// return context.fruits;

		return tempDataFruit;
	},
};

const app = express();
app.use(
	'/graphql',
	graphqlHTTP({
		schema: GQLNXSchema,
		// rootValue: root,
		graphiql: true,
		context: <GQLContextType>{
			fruits: tempDataFruit,
		},
		pretty: false,
	}),
);
app.listen(4000);

console.log('running on :4000/graphql');
