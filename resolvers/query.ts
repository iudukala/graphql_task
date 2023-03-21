import { ProductType, CategoryType } from '../data.ts';

export const Query = {
	hello: () => ['World!'],

	products: (parent: object, args: { id: string }, context: { products: Array<ProductType> }) =>
		context.products,
	product: (parent: object, args: { id: string }, context: { products: Array<ProductType> }) => {
		return context.products.find((product: { id: string }) => product.id === args.id) || null;
	},

	categories: (parent: object, args: { id: string }, context: { categories: Array<CategoryType> }) =>
		context.categories,
	// category: (parent: object, args: { id: string }, context: object) => {
	category: (parent: object, args: { id: string }, context: { categories: Array<CategoryType> }) =>{
		return context.categories.find((category: { id: string }) => category.id === args.id) || null;
	},
};
