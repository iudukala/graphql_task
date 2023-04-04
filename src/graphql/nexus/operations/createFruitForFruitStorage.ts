import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../../constants/enum_nexusTypeKey';
import { NexusGenObjects } from '../../nexus_autogen/nexus-typegen';
import { AllNexusArgsDefs } from 'nexus/dist/core';
import { randomUUID } from 'crypto';
import { GQLContextType } from '../../..';
import { FruitKey } from '../../constants/enum_fruitKey';

type FruitArgs = Pick<
// todo: figure out why omit isn't working
	NexusGenObjects[GQLType.Fruit],
	FruitKey.Name | FruitKey.Description | FruitKey.Limit
>;

export const createFruitForFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createFruitForFruitStorage', {
			type: GQLType.Fruit,

			args: <Record<keyof FruitArgs, AllNexusArgsDefs>>{
				name: nonNull(stringArg()),
				description: nonNull(stringArg()),
				limit: nonNull(intArg()),
			},

			resolve: (_, args: FruitArgs, context: GQLContextType) => {
				const newFruit: NexusGenObjects[GQLType.Fruit] = {
					[FruitKey.ID]: randomUUID(),
					[FruitKey.Amount]: 0,

					...args,
				};

				context.fruits.push(newFruit);
				return newFruit;
			},
		});
	},
});
