import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../constants/enum_nexusTypeKey';
import { AllNexusArgsDefs } from 'nexus/dist/core';
import { GQLContextType } from '../../types/GQLContextType';
import { FruitKey } from '../constants/enum_fruitKey';

import type { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX';

export type FruitConstructArgs = Omit<FruitTypeGQL, typeof FruitKey.ID | typeof FruitKey.Amount>;

export const createFruitForFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createFruitForFruitStorage', {
			type: GQLType.Fruit,

			args: <Record<keyof FruitConstructArgs, AllNexusArgsDefs>>{
				name: nonNull(stringArg()),
				description: nonNull(stringArg()),
				limit: nonNull(intArg()),
			},

			resolve: (_, args: FruitConstructArgs, context: GQLContextType) => {
				const newFruit: FruitTypeGQL = FruitFactory(args);

				context.fruits.push(newFruit);
				return newFruit;
			},
		});
	},
});
