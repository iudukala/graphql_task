import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../common/enum_nexusTypeKey.js';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { GQLContextType } from '../common/type_GQLContextType.js';

import type { FruitConstructArgs } from '../../Fruit/types.js';
import { Fruit } from '../../Fruit/Fruit.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { tempDataFruit } from '../../tempData.js';
import { mapToPersistenceModel } from '../../persistence/mapToPersistenceModel.js';
import mongoose, { Document, Model } from 'mongoose';
import { connectDB } from '../../persistence/connectDB.js';
// import { PersistenceFruitModel } from '../../persistence/type_persistenceFruitModel.js';
import { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX.js';
import { commitToPersistence } from '../../persistence/commitToPersistence.js';
// import { commitToPersistence } from '../../persistence/commitToPersistence.js';

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
				return await commitToPersistence(Fruit.createNewFruit(args), context.DB_URI);
			},
		});
	},
});

// export type P = Omit<FruitTypeGQL, typeof FruitKey.ID> & Document;
