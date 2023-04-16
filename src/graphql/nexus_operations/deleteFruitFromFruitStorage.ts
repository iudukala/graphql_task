import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../common/enum_nexusTypeKey.js';
import { AllNexusArgsDefs, booleanArg } from 'nexus/dist/core.js';
import { GQLContextType } from '../common/type_GQLContextType.js';

import type { FruitConstructArgs } from '../../Fruit/types.js';
import { Fruit } from '../../Fruit/Fruit.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { mapToPersistenceModel } from '../../persistence/mapToPersistenceModel.js';
import mongoose from 'mongoose';
import { connectDB } from '../../persistence/connectDB.js';

type DeleteMutationArgs = { [FruitKey.Name]: string; forceDelete: boolean };
/**
 * mutation for deleting a fruit.
 * structure: deleteFruitFromFruitStorage(name: string, forceDelete: boolean)
 */
export const deleteFruitFromFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('deleteFruitFromFruitStorage', {
			type: GQLType.Fruit,

			args: <Record<keyof DeleteMutationArgs, AllNexusArgsDefs>>{
				[FruitKey.Name]: nonNull(stringArg()),
				forceDelete: booleanArg(),
			},

			resolve: async (_, args: DeleteMutationArgs, context: GQLContextType) => {

				// return commitToPersistence(Fruit.createNewFruit(args), context.DB_URI);
			},
		});
	},
});

/**
 *
 * @param fruit fruit object to commit to database
 * @param DB_URI database connection uri
 */
async function commitToPersistence(fruit: Fruit, DB_URI: string) {
	connectDB(DB_URI);

	const newFruit = await mapToPersistenceModel(fruit)
		.save()
		.catch(error => {
			throw new Error('database commit failed: ' + error);
		});

	mongoose.connection.close();
	return newFruit;
}
