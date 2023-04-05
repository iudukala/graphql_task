import { extendType } from 'nexus';
import { GQLType } from '../constants/enum_nexusTypeKey';
import { GQLContextType } from '../../types/GQLContextType';

// todo: change to 'findFruit()'
export const FruitQueryExt = extendType({
	type: GQLType.Query,

	definition(t) {
		t.nonNull.list.field('fruits', {
			type: GQLType.Fruit,
			resolve: (_, __, context: GQLContextType) => context.fruits,
		});
	},
});