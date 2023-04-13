import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../common/enum_nexusTypeKey.js';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { GQLContextType } from '../common/type_GQLContextType.js';

import type { FruitConstructArgs } from '../../Fruit/types.js';
import { Fruit } from '../../Fruit/Fruit.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { tempDataFruit } from '../../tempData.js';
import { fruitSchemaMapper } from '../../Fruit/fruitSchemaMapper.js';
import mongoose from 'mongoose';
import { DB_URI } from '../../index.js';

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
				return commitToPersistence(Fruit.createNewFruit(args));
			},
		});
	},
});

async function commitToPersistence(fruit: Fruit) {
	// if in state 'disconnected' or 'disconnecting'
	if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3)
		await mongoose.connect(DB_URI);

	const newFruit = await fruitSchemaMapper(fruit)
		.save()
		.catch(error => {
			throw new Error('database commit failed: ' + error);
		});

	mongoose.connection.close();

	return newFruit;
}
