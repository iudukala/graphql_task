import { extendType } from 'nexus';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { mapToPersistenceModel } from '../../persistence/mapToPersistenceModel.js';
import { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX.js';
import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';

// todo: change to 'findFruit()'
export const FruitQueryExt = extendType({
	type: 'Query',

	definition(t) {
		t.nonNull.list.field('fruits', {
			type: FRUIT_NAME,
			resolve: (_, __, context: GQLContextType) =>
				context.fruits.map(fruit => mapToPersistenceModel(fruit) as FruitTypeGQL),
		});
	},
});
