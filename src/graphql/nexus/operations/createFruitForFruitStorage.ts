import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../../constants/enum_nexusTypeKey';
import { NexusGenObjects } from '../../nexus_autogen/nexus-typegen';
import { GQL_IDKEY } from '../../constants/const_GQLIDKey';
import { AllNexusArgsDefs } from 'nexus/dist/core';
import { randomUUID } from 'crypto';
import { GQLContextType } from '../../..';
import { FruitKey } from '../../constants/enum_fruitKey';

export type IDOmittedNexusType<T extends GQLType> = Omit<NexusGenObjects[T], typeof GQL_IDKEY>;
export const createFruitForFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createFruitForFruitStorage', {
			type: GQLType.Fruit,
			args: <
				Record<
					keyof Omit<NexusGenObjects[GQLType.Fruit], FruitKey.ID | FruitKey.Amount>,
					AllNexusArgsDefs
				>
			>{
				name: nonNull(stringArg()),
				description: nonNull(stringArg()),
				limit: nonNull(intArg()),
			},

			resolve: (
				_,
				args: Omit<NexusGenObjects[GQLType.Fruit], typeof FruitKey.ID | typeof FruitKey.Amount>,
				args: Omit<IDOmittedNexusType<GQLType.Fruit>, 'amount'>,
				// args: Omit<IDOmittedNexusType<GQLType.Fruit>, 'amount'>,
				context: GQLContextType,
			) => {
				const newFruit: NexusGenObjects[GQLType.Fruit] = {
					[FruitKey.ID]: randomUUID(),
					[FruitKey.Amount]: 0,

					...args,
				};
				// todo
				// store limit and count count separately. change gql schema

				context.fruits.push(newFruit);
				return newFruit;
			},
		});
	},
});
