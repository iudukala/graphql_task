import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../common/enum_nexusTypeKey.js';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { GQLContextType } from '../common/type_GQLContextType.js';

import type { FruitConstructArgs } from '../../Fruit/types.js';
import { Fruit } from '../../Fruit/Fruit.js';
import { translateFruit } from '../../Fruit/translateFruit.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';

type FruitModifyArgs = Omit<
	FruitConstructArgs,
	typeof FruitKey.Description | typeof FruitKey.Limit
> & { [FruitKey.Amount]: number };

/**
 * mutation for updating the the amount of an existing fruit.
 * structure: storeFruitToFruitStorage(name: string, amount: int)
 */
export const storeFruitToFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('storeFruitToFruitStorage', {
			type: GQLType.Fruit,

			args: <Record<keyof FruitModifyArgs, AllNexusArgsDefs>>{
				[FruitKey.Name]: nonNull(stringArg()),
				[FruitKey.Amount]: nonNull(intArg()),
			},

			resolve: (_discard, args: FruitModifyArgs, context: GQLContextType) => {
				throw new Error("not implemented");
				// const newFruit: Fruit = Fruit.createNewFruit(args);

				// // todo: persistence logic
				// const translated = translateFruit(newFruit);

				// context.fruits.push(translated);
				// return translated;
			},
		});
	},
});