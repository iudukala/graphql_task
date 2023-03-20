import { products, categories } from './products.ts';
// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
	type Query {
		hello: [String]

		products: [Product!]!
		product(id: ID!): Product

		categories: [Category!]!
		category(id: ID!): Category
	}
	type Product {
		id: String!
		name: String!
		description: String!
		quantity: Int!
		price: Float!
		onSale: Boolean!
		image: String!
	}
	type Category {
		id: ID!
		name: String!
		products: [Product!]!

	}
`;

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
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }: { url: string }) => {
	console.log('server is ready at ' + url);
});
