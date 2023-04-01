import { extendType } from 'nexus';
import { GQLNexusTypeName } from '../nexus_type_keys';

export const PostQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.list.field('drafts', {
			type: GQLNexusTypeName.Fruit,
		});
	},
});
