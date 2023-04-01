import { extendType } from 'nexus';
import { GQLNexusTypeName } from '../nexus_type_keys';
import { tempDataFruit } from '../../tempData';

export const FruitQuery = extendType({
	type: 'Query',
	definition(t) {
		t.field('fruits', {
			type: GQLNexusTypeName.Fruit,
			resolve: () => tempDataFruit,
		});
	},
});
