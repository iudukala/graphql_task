import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../common/enum_nexusTypeKey.js';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { GQLContextType } from '../common/type_GQLContextType.js';

import type { FruitConstructArgs } from '../../Fruit/types.js';
import { Fruit } from '../../Fruit/Fruit.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { tempDataFruit } from '../../tempData.js';
import { fruitSchemaMapper } from '../../Fruit/fruitSchemaMapper.js';

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
				[FruitKey.Name]: nonNull(stringArg()),
				[FruitKey.Description]: nonNull(stringArg()),
				[FruitKey.Limit]: nonNull(intArg()),
			},

			resolve: async (_, args: FruitConstructArgs, context: GQLContextType) => {
				// const newFruit: Fruit = [Fruit.createNewFruit(args)].map(fruitSchemaMapper)[0].save()
				// const newFruit: Fruit = Fruit.createNewFruit(args);

				// todo: persistence logic
				// const translated = translateFruit(newFruit);

				// context.fruits.push(translated);
				// return translated;

				const newFruit = await fruitSchemaMapper(Fruit.createNewFruit(args))
					.save()
					.catch(error => {
						throw new Error('database commit failed: ' + error);
					});

				// .then(response => {
				// 	console.log(response)
				// 	// return response;
				// });
				// return newFruit;

				return tempDataFruit[1];
			},
		});
	},
});
