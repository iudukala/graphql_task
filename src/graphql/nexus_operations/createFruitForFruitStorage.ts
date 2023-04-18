import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { Fruit } from '../../Fruit/Fruit.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';
import { FruitMapper } from '../../Fruit/FruitMapper.js';
import { FruitRepo } from '../../Fruit/FruitRepository.js';
import type { FruitConstructArgs, FruitDTO } from '../../Fruit/types.js';

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
				const newFruit: Fruit = Fruit.createNewFruit(args);
				await new FruitRepo(context.DB_URI).commitToPersistence(newFruit);

				return FruitMapper.toPersistence(newFruit) as FruitDTO;
			},
		});
	},
});
