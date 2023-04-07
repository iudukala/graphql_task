import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../constants/enum_nexusTypeKey';
import { AllNexusArgsDefs } from 'nexus/dist/core';
import { GQLContextType } from '../../types/GQLContextType';
import { FruitFactory } from '../../Fruit/FruitFactory';
import { FruitKey } from '../constants/enum_fruitKey';

import type { FruitType } from '../nexus_types/FruitType';
export type FruitConstructArgs = Omit<FruitType, typeof FruitKey.ID | typeof FruitKey.Amount>;

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
				const newFruit: FruitType = FruitFactory(args);

				context.fruits.push(newFruit);
				return newFruit;
			},
		});
	},
});
