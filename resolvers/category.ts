import { products } from '../data.ts';

export const Category = {
	products: (parent: { id: string; name: string }, args: { id: string }, context: object) => {
		return products.filter((product: { categoryID: string }) => product.categoryID === parent.id);
	},
};
