import { extendType, nonNull, stringArg } from 'nexus';
import { GQLType } from '../common/enum_nexusTypeKey.js';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { mapToPersistenceModel } from '../../persistence/mapToPersistenceModel.js';
import { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX.js';
import { FruitModel } from '../../Fruit/mongooseFruitModel.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { connectDB } from '../../persistence/connectDB.js';
import { Fruit } from '../../Fruit/Fruit.js';

// todo: change to 'findFruit()'
export const findFruit = extendType({
	type: GQLType.Query,

	definition(t) {
		t.nonNull.list.field('findFruit', {
			type: GQLType.Fruit,

			args: {
				[FruitKey.Name]: nonNull(stringArg()),
			},

			resolve: async (_discard, args: { [FruitKey.Name]: string }, context: GQLContextType) => {
				const target = await findFruitByName(args.name, context.DB_URI);
				console.log(target);
				const x = mapToPersistenceModel(Fruit.reconstituteFruit(target));

				console.log(x.id + '-' + x._id);
				return [x] as [FruitTypeGQL];

				// return [mapToPersistenceModel(mapFromPersistenceModel(target)) as FruitTypeGQL];
				// return [target as FruitTypeGQL];
			},
		});
	},
});

const findFruitByName = async (fruitName: string, DB_URI: string) => {
	await connectDB(DB_URI);
	const target = await FruitModel.findOne({ [FruitKey.Name]: fruitName })
		.lean()
		.exec();
	if (target === null || target === undefined)
		throw new Error(`fruit not found for name: [${fruitName}]`);

	return target;
};
