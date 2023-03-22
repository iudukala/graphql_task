import { CategoryType, ProductType, ReviewType } from '../data.ts';

export const Product = {
	category: (parent: ProductType, args: { id: string }, context: { categories: Array<CategoryType> }) => {
		return context.categories.find((category: { id: string }) => category.id === parent.categoryID);
	},

	reviews: (parent: ProductType, args: { id: string }, context: { reviews: Array<ReviewType> }) => {
		return context.reviews.filter((review: ReviewType) => review.productId === parent.id);
	},
};
