import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../constants/enum_nexusTypeKey';
import { AllNexusArgsDefs } from 'nexus/dist/core';
import { GQLContextType } from '../../types/GQLContextType';

import type { FruitConstructArgs } from '../../Fruit/types';
import { Fruit } from '../../Fruit/Fruit';
import { translateFruit } from '../../Fruit/translateFruit';

/**
 * mutation for adding a new fruit.
 * structure: createFruitForFruitStorage(name: string, description: string, limit: int)
 */
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
				const newFruit: Fruit = Fruit.createNewFruit(args);

				// todo: persistence logic
				const translated = translateFruit(newFruit);

				context.fruits.push(translated);
				return translated;
			},
		});
	},
});
