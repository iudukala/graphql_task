import { v4 as uuid } from 'uuid';
import { CategoryType, ProductType } from '../data.ts';
import { GQLContextType } from '../index.ts';

export const Mutation = {
	// addCategory: (parent: object, args: { input: { name: string } }, context: GQLContextType) => {
	addCategory: (parent: object, args: { input: Omit<CategoryType, 'id'> }, context: GQLContextType) => {
		console.log(args);

		const newCategory: CategoryType = {
			id: uuid(),
			...args.input,
			// name: args.input.name,
		};

		context.categories.push(newCategory);
		return newCategory;
	},

	addProduct: (parent: object, args: { input: Omit<ProductType, 'id'> }, context: GQLContextType) => {
		console.log('new category:' + args);

		const newProduct: ProductType = {
			id: uuid(),
			...args.input,
		};

		context.products.push(newProduct);
		return newProduct;
	},
};
