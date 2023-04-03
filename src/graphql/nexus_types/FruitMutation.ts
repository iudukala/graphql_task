import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLNexusTypeName } from '../enum_nexus_type_keys';
import { NexusGenObjects } from '../nexus_autogen/nexus-typegen';
import { GQL_IDKEY } from '../const/gqlIDKey';
import { AllNexusArgsDefs } from 'nexus/dist/core';
import { randomUUID } from 'crypto';
import { context } from '../../gql_context';
import { GQLContextType } from '../..';

// todo: replace with generic type that builds the type for mutator arg object
type IDOmittedFruitType = Omit<NexusGenObjects[GQLNexusTypeName.Fruit], typeof GQL_IDKEY>;
export const FruitMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createFruit', {
			type: GQLNexusTypeName.Fruit,
			args: <Record<keyof IDOmittedFruitType, AllNexusArgsDefs>>{
				name: nonNull(stringArg()),
				description: nonNull(stringArg()),
				amount: nonNull(intArg()),
			},
			resolve: (_, args: IDOmittedFruitType, context: GQLContextType) => {
				const newFruit: NexusGenObjects[GQLNexusTypeName.Fruit] = {
					[GQL_IDKEY]: randomUUID(),
					...args,
				};

				context.fruits.push(newFruit);
				return newFruit;
			},
		});
	},
});
