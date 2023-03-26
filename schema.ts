import { gql } from 'apollo-server';

export const typeDefs = gql`
	type Query {
		hello: [String]

		products(filter: ProductsFilterInput): [Product!]!
		product(id: ID!): Product

		categories: [Category!]!
		category(id: ID!): Category
	}

	type Mutation {
		addCategory(input: AddCategoryInput!): Category!
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
		products(filter: ProductsFilterInput): [Product!]!
	}

	type Review {
		id: ID!
		date: String!
		title: String!
		comment: String!
		rating: Int!
		product: Product!
	}

	input ProductsFilterInput {
		onSale: Boolean
		avgRating: Int
	}

	input AddCategoryInput{
		name: String!
	}
`;
