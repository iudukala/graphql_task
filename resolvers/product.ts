import { categories } from '../data.ts';

export const Product = {
	category: (parent: { categoryID: string }, args: { id: string }, context: object) => {
		return categories.find((category: { id: string }) => category.id === parent.categoryID);
	},
};
