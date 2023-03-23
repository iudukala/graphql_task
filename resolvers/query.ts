import { ProductType, CategoryType } from '../data.ts';

export const Query = {
	hello: () => ['World!'],

	products: (
		parent: object,
		args: { filter: { onSale: boolean } },
		context: { products: Array<ProductType> },
	) => {
		if (!args.filter) return context.products;
		else {
			// if (args.filter.onSale != undefined) {
			return context.products.filter((product: ProductType) => product.onSale === args.filter.onSale);
			// }
		}
	},
	product: (parent: object, args: { id: string }, context: { products: Array<ProductType> }) => {
		return context.products.find((product: { id: string }) => product.id === args.id) || null;
	},

	categories: (parent: object, args: { id: string }, context: { categories: Array<CategoryType> }) =>
		context.categories,
	// category: (parent: object, args: { id: string }, context: object) => {
	category: (parent: object, args: { id: string }, context: { categories: Array<CategoryType> }) => {
		return context.categories.find((category: { id: string }) => category.id === args.id) || null;
	},
};
