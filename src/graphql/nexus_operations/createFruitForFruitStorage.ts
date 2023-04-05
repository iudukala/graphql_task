import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../constants/enum_nexusTypeKey';
import { AllNexusArgsDefs } from 'nexus/dist/core';
import { GQLContextType } from '../../types/GQLContextType';
import { FruitFactory } from '../../Fruit/FruitFactory';

import type { FruitType } from '../nexus_types/FruitType';
import type { FruitConstructArgs } from '../../Fruit/FruitConstructArgs';

// todo: figure out why omit isn't working

export const createFruitForFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createFruitForFruitStorage', {
			type: GQLType.Fruit,

			args: <Record<keyof FruitConstructArgs, AllNexusArgsDefs>>{
				name: nonNull(stringArg()),
				description: nonNull(stringArg()),
				limit: nonNull(intArg()),
			},

			resolve: (_, args: FruitConstructArgs, context: GQLContextType) => {
				const newFruit: FruitType = FruitFactory(args);

				context.fruits.push(newFruit);
				return newFruit;
			},
		});
	},
});

// type Y = Omit<temp, FruitKey.Amount> & Partial<Record<FruitKey.Amount, never>>;
// export type IDOmittedNexusType<T extends GQLType> = Omit<FruitType, typeof GQL_IDKEY>;
// type FruitArgs = Pick<
// 	N[GQLType.Fruit],
// 	FruitKey.Name | FruitKey.Description | FruitKey.Limit
// >,
// } as Record< keyof Omit<[GQLType.Fruit], FruitKey.ID | FruitKey.Amount>,
// 	AllNexusArgsDefs
// args: Omit<N[GQLType.Fruit], FruitKey.ID | FruitKey.Amount>,
// args: Omit<IDOmittedNexusType<GQLType.Fruit>, 'amount'>,
