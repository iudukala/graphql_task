import { extendType } from 'nexus';
import { GQLNexusType } from '../nexus_type_keys';

export const PostQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.list.field('drafts', {
			type: GQLNexusType.Fruit,
		});
	},
});
