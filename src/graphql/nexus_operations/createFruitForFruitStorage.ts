import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../constants/enum_nexusTypeKey';
import { AllNexusArgsDefs } from 'nexus/dist/core';
import { GQLContextType } from '../../types/GQLContextType';

import type { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX';
import type { FruitConstructArgs } from '../../Fruit/types';
import { obsolete_FruitFactory } from '../../Fruit/FruitFactory';
import { Fruit } from '../../Fruit/Fruit';
import { FruitKey } from '../constants/enum_fruitKey';

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
				newFruit.props.name = 'x';

				const translated = {
					[FruitKey.ID]: newFruit.id,
					[FruitKey.Name]: newFruit.props.name,
					[FruitKey.Description]: newFruit.props.description.value,
					[FruitKey.Limit]: newFruit.props.limit,
					[FruitKey.Amount]: newFruit.props.amount,
				};

				context.fruits.push(translated);
				return translated;
			},
		});
	},
});
