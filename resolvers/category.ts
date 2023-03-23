import { parseConstValue } from 'graphql';
import { ProductType } from '../data.ts';

export const Category = {
	products: (
		parent: { id: string; name: string },
		args: { filter: { onSale: boolean } },
		context: { products: Array<ProductType> },
	) => {
		const filteredProducts = context.products.filter(
			(product: ProductType) => product.categoryID === parent.id,
		);
		if (!args.filter) return filteredProducts;
		else {
			return filteredProducts.filter((product: ProductType) => product.onSale === args.filter.onSale);
		}
	},
};
