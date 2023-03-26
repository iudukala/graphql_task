import { v4 as uuid } from 'uuid';
import { CategoryType } from '../data.ts';
import { GQLContextType } from '../index.ts';

export const Mutation = {
	addCategory: (parent: object, args: { input: { name: string } }, context: GQLContextType) => {
		console.log(args);

		const newCategory: CategoryType = {
			id: uuid(),
			name: args.input.name,
		};

		context.categories.push(newCategory);
		return newCategory;
	},
};
