import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../constants/enum_nexus_type_keys';
import { NexusGenObjects } from '../nexus_autogen/nexus-typegen';
import { GQL_IDKEY } from '../constants/gqlIDKey';
import { AllNexusArgsDefs } from 'nexus/dist/core';
import { randomUUID } from 'crypto';
import { GQLContextType } from '../..';
import { IDOmittedNexusType } from './IDOmittedNexusType';

export const createFruitForFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createFruitForFruitStorage', {
			type: GQLType.Fruit,
			args: <Record<keyof IDOmittedNexusType<GQLType.Fruit>, AllNexusArgsDefs>>{
				name: nonNull(stringArg()),
				description: nonNull(stringArg()),
				amount: nonNull(intArg()),
			},
			resolve: (_, args: IDOmittedNexusType<GQLType.Fruit>, context: GQLContextType) => {
				const newFruit: NexusGenObjects[GQLType.Fruit] = {
					[GQL_IDKEY]: randomUUID(),
					...args,
				};

				context.fruits.push(newFruit);
				return newFruit;
			},
		});
	},
});
