import { ProductType, ReviewType } from '../data.ts';
import { GQLContextType } from '../index.ts';

export const Query = {
	hello: () => ['World!'],

	products: (
		parent: object,
		args: { filter: { onSale: boolean; avgRating: number } },
		context: GQLContextType,
	) => {
		const filterOnSale = (product: ProductType): boolean =>
			args.filter?.onSale === undefined ? true : product.onSale === args.filter.onSale;

		const filterAverageRating = (product: ProductType): boolean => {
			if (args.filter?.avgRating === undefined) return true;

			const productReviews: Array<ReviewType> = context.reviews.filter(
				(review: ReviewType) => review.productId === product.id,
			);

			const ratingsTotal: number = productReviews.reduce(
				(acc: number, currentValue: ReviewType) => acc + currentValue.rating,
				0,
			);

			const average = ratingsTotal / productReviews.length;
			console.log(product.name + ' --- ' + average);

			return average > args.filter.avgRating;
		};

		// if (!args.filter) return context.products;
		// else return context.products.filter((product: ProductType) => product.onSale === args.filter.onSale);

		// return context.reviews.filter((review: ReviewType) => review.productId === parent.id);

		// console.log('x');
		return context.products.filter(filterOnSale).filter(filterAverageRating);
	},
	product: (parent: object, args: { id: string }, context: GQLContextType) => {
		return context.products.find((product: { id: string }) => product.id === args.id) || null;
	},

	categories: (parent: object, args: { id: string }, context: GQLContextType) => context.categories,
	category: (parent: object, args: { id: string }, context: GQLContextType) => {
		return context.categories.find((category: { id: string }) => category.id === args.id) || null;
	},
};
