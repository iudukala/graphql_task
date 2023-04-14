import { extendType, nonNull, stringArg } from 'nexus';
import { GQLType } from '../common/enum_nexusTypeKey.js';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { mapToPersistenceModel } from '../../persistence/mapToPersistenceModel.js';
import { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX.js';
import { FruitModel } from '../../Fruit/mongooseFruitModel.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { mapFromPersistenceModel } from '../../persistence/mapFromPersistenceModel.js';
import { tempDataFruit } from '../../tempData.js';

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
				const target = await findFruitByName(args.name);
				// return mapToPersistenceModel(mapFromPersistenceModel(target)) as FruitTypeGQL;

				// return context.fruits.map(fruit => mapToPersistenceModel(fruit) as FruitTypeGQL);
				return [mapToPersistenceModel(tempDataFruit[0]) as FruitTypeGQL];
			},
		});
	},
});

const findFruitByName = async (fruitName: string) => {
	const target = await FruitModel.findOne({ [FruitKey.Name]: fruitName })
		.lean()
		.exec();
	if (target === null || target === undefined)
		throw new Error(`fruit not found for name: [${fruitName}]`);

	return target;
};
