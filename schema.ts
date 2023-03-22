import { gql } from 'apollo-server';

export const typeDefs = gql`
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
		category: Category
        reviews: [Review!]!
	}
	type Category {
		id: ID!
		name: String!
		products: [Product!]!
	}
    type Review {
        id: ID!
        date: String!
        title: String!
        comment: String!
        rating: Int!
        product: Product!
    }
`;
