import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { Fruit } from '../../Fruit/Fruit.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { commitToPersistence } from '../../persistence/commitToPersistence.js';
import type { FruitConstructArgs } from '../../Fruit/types.js';
import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';

/**
 * mutation for adding a new fruit.
 * structure: createFruitForFruitStorage(name: string, description: string, limit: int)
 */
export const createFruitForFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createFruitForFruitStorage', {
			type: FRUIT_NAME,

			args: <Record<keyof FruitConstructArgs, AllNexusArgsDefs>>{
				[FruitKey.Name]: nonNull(stringArg()),
				[FruitKey.Description]: nonNull(stringArg()),
				[FruitKey.Limit]: nonNull(intArg()),
			},

			resolve: async (_, args: FruitConstructArgs, context: GQLContextType) => {
				return await commitToPersistence(Fruit.createNewFruit(args), context.DB_URI);
			},
		});
	},
});
