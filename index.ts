import { products, categories, reviews } from './data.ts';
import { Category } from './resolvers/category.ts';
import { Product } from './resolvers/product.ts';
import { Query } from './resolvers/query.ts';
import { typeDefs } from './schema.ts';

// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer } from 'apollo-server';

const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Query,
		Category,
		Product,
	},
	context: {
		products,
		categories,
		reviews,
	},
});

server.listen().then(({ url }: { url: string }) => {
	console.log('server is ready at ' + url);
});
