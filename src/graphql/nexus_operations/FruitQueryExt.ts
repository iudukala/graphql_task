import { extendType } from 'nexus';
import { GQLType } from '../common/enum_nexusTypeKey.js';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { mapToPersistenceModel } from '../../persistence/mapToPersistenceModel.js';
import { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX.js';

// todo: change to 'findFruit()'
export const FruitQueryExt = extendType({
	type: GQLType.Query,

	definition(t) {
		t.nonNull.list.field('fruits', {
			type: GQLType.Fruit,
			resolve: (_, __, context: GQLContextType) =>
				context.fruits.map(fruit => mapToPersistenceModel(fruit) as FruitTypeGQL),
		});
	},
});
