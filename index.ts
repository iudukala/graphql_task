import { products, categories } from './products.ts';
import { typeDefs } from './schema.ts';

// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer } from 'apollo-server';

const resolvers = {
	Query: {
		hello: () => ['World!'],

		products: () => products,
		product: (parent: object, args: { id: string }, context: object) => {
			return products.find((product: { id: string }) => product.id === args.id) || null;
		},
		categories: () => categories,
		category: (parent: object, args: { id: string }, context: object) => {
			return categories.find((category: { id: string }) => category.id === args.id) || null;
		},
	},
	Category: {
		products: (parent: { id: string; name: string }, args: { id: string }, context: object) => {
			return products.filter((product: { categoryID: string }) => product.categoryID === parent.id);
		},
	},
	Product: {
		category: (parent: { categoryID: string }, args: { id: string }, context: object) => {
			return categories.find((category: { id: string }) => category.id === parent.categoryID);
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }: { url: string }) => {
	console.log('server is ready at ' + url);
});
