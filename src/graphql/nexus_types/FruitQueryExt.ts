import { extendType } from 'nexus';
import { GQLNexusTypeName } from '../constants/enum_nexus_type_keys';
import { GQLContextType } from '../..';

export const FruitQueryExt = extendType({
	type: GQLNexusTypeName.Query,

	definition(t) {
		t.nonNull.list.field('fruits', {
			type: GQLNexusTypeName.Fruit,
			resolve: (_, __, context: GQLContextType) => context.fruits,
		});
	},
});
