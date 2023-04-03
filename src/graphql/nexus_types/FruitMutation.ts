import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLNexusTypeName } from '../enum_nexus_type_keys';
import { NexusGenObjects } from '../nexus_autogen/nexus-typegen';

type FruitMutationType = Omit<NexusGenObjects[GQLNexusTypeName.Fruit], 'id'>;

export const FruitMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createFruit', {
			type: GQLNexusTypeName.Fruit,
			args: {
				name: nonNull(stringArg()),
				description: nonNull(stringArg()),
				amount: nonNull(intArg()),
			},
			resolve: () => {
				return null;
			},
		});
	},
});
