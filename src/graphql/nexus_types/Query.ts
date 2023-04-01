import { extendType } from 'nexus';
import { GQLNexusTypeName } from '../enum_nexus_type_keys';
import { tempDataFruit } from '../../tempData';

export const FruitQueryExt = extendType({
	type: GQLNexusTypeName.Query,

	definition(t) {
		t.nonNull.list.field('fruits', {
			type: GQLNexusTypeName.Fruit,
			resolve: () => tempDataFruit,
		});
	},
});
