import { products, categories, reviews, ProductType, CategoryType, ReviewType } from './data.ts';
import { Category } from './resolvers/category.ts';
import { Mutation } from './resolvers/mutation.ts';
import { Product } from './resolvers/product.ts';
import { Query } from './resolvers/query.ts';
import { typeDefs } from './schema.ts';

// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer } from 'apollo-server';

const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Query,
		Mutation,
		Category,
		Product,
	},
	context: <GQLContextType>{
		products,
		categories,
		reviews,
	},
});

server.listen().then(({ url }: { url: string }) => {
	console.log('server is ready at ' + url);
});


export type GQLContextType = {
	products: Array<ProductType>;
	categories: Array<CategoryType>;
	reviews: Array<ReviewType>;
};