import { ProductType } from '../data.ts';

export const Category = {
	products: (
		parent: { id: string; name: string },
		args: { id: string },
		context: { products: Array<ProductType> },
	) => {
		return context.products.filter((product: { categoryID: string }) => product.categoryID === parent.id);
	},
};
