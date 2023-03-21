import { products, categories } from '../data.ts';

export const Query = {
	hello: () => ['World!'],

	products: () => products,
	product: (parent: object, args: { id: string }, context: object) => {
		return products.find((product: { id: string }) => product.id === args.id) || null;
	},
	categories: () => categories,
	category: (parent: object, args: { id: string }, context: object) => {
		return categories.find((category: { id: string }) => category.id === args.id) || null;
	},
};
