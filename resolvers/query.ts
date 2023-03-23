import { ProductType } from '../data.ts';
import { GQLContextType } from '../index.ts';

export const Query = {
	hello: () => ['World!'],

	products: (parent: object, args: { filter: { onSale: boolean } }, context: GQLContextType) => {
		if (!args.filter) return context.products;
		else return context.products.filter((product: ProductType) => product.onSale === args.filter.onSale);

		// return context.reviews.filter((review: ReviewType) => review.productId === parent.id);
	},
	product: (parent: object, args: { id: string }, context: GQLContextType) => {
		return context.products.find((product: { id: string }) => product.id === args.id) || null;
	},

	categories: (parent: object, args: { id: string }, context: GQLContextType) => context.categories,
	category: (parent: object, args: { id: string }, context: GQLContextType) => {
		return context.categories.find((category: { id: string }) => category.id === args.id) || null;
	},
};
