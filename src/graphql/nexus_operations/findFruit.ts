import { extendType, nonNull, stringArg } from 'nexus';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { mapToPersistenceModel } from '../../persistence/mapToPersistenceModel.js';
import { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX.js';
import { FruitModel } from '../../Fruit/mongooseFruitModel.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { connectDB } from '../../persistence/connectDB.js';
import { Fruit } from '../../Fruit/Fruit.js';
import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';
import { findFruitByName } from './helpers/findFruitByName.js';

// todo: change to 'findFruit()'
export const findFruit = extendType({
	type: 'Query',

	definition(t) {
		t.nonNull.list.field('findFruit', {
			type: FRUIT_NAME,

			args: {
				[FruitKey.Name]: nonNull(stringArg()),
			},

			resolve: async (_discard, args: { [FruitKey.Name]: string }, context: GQLContextType) => {
				const target = await findFruitByName(args.name, context.DB_URI);
				return [mapToPersistenceModel(Fruit.reconstituteFruit(target)) as FruitTypeGQL];
			},
		});
	},
});
