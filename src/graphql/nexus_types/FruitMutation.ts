import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLNexusTypeName } from '../enum_nexus_type_keys';
import { NexusGenObjects } from '../nexus_autogen/nexus-typegen';
import { GQL_IDKEY } from '../const/gqlIDKey';
import { AllNexusArgsDefs } from 'nexus/dist/core';

// todo: replace with generic type that builds the type for mutator arg object
type FruitMutationType = Record<
	keyof Omit<NexusGenObjects[GQLNexusTypeName.Fruit], typeof GQL_IDKEY>,
	AllNexusArgsDefs
>;
export const FruitMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createFruit', {
			type: GQLNexusTypeName.Fruit,
			args: <FruitMutationType>{
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
