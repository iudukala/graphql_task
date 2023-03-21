import { CategoryType } from '../data.ts';

export const Product = {
	category: (parent: { categoryID: string }, args: { id: string }, context: { categories: Array<CategoryType> }) => {
		return context.categories.find((category: { id: string }) => category.id === parent.categoryID);
	},
};
