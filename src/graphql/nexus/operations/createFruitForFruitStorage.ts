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
				// type Y = Omit<temp, FruitKey.Amount> & Partial<Record<FruitKey.Amount, never>>;

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

// type Y = Omit<temp, FruitKey.Amount> & Partial<Record<FruitKey.Amount, never>>;

// export type IDOmittedNexusType<T extends GQLType> = Omit<NexusGenObjects[T], typeof GQL_IDKEY>;
// type FruitArgs = Pick<
// 	NexusGenObjects[GQLType.Fruit],
// 	FruitKey.Name | FruitKey.Description | FruitKey.Limit
// >,

// } as Record< keyof Omit<NexusGenObjects[GQLType.Fruit], FruitKey.ID | FruitKey.Amount>,
// 	AllNexusArgsDefs
// args: Omit<NexusGenObjects[GQLType.Fruit], FruitKey.ID | FruitKey.Amount>,
// args: Omit<IDOmittedNexusType<GQLType.Fruit>, 'amount'>,


// function FruitFactory(constructionPrps: FruitArgs):