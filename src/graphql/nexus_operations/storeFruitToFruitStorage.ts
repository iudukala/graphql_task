import { extendType, intArg, nonNull, stringArg } from 'nexus';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { FruitMapper } from '../../Fruit/FruitMapper.js';
import { FruitRepo } from '../../Fruit/FruitRepository.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { FruitModel } from '../../Fruit/mongooseFruitModel.js';
import { FruitDTO } from '../../Fruit/types.js';
import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';
import { GQLContextType } from '../common/type_GQLContextType.js';

type FruitModifyArgs = Omit<
	FruitDTO,
	typeof FruitKey.ID | typeof FruitKey.Limit | typeof FruitKey.Description
>;

/**
 * mutation for updating the the amount of an existing fruit.
 *
 * signature : storeFruitToFruitStorage(name: string, amount: int)
 */
export const storeFruitToFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('storeFruitToFruitStorage', {
			type: FRUIT_NAME,

			args: <Record<keyof FruitModifyArgs, AllNexusArgsDefs>>{
				[FruitKey.Name]: nonNull(stringArg()),
				[FruitKey.Amount]: nonNull(intArg()),
			},

			resolve: async (_discard, args: FruitModifyArgs, context: GQLContextType) => {
				const target = await new FruitRepo(context.DB_URI).findFruitByName(args.name);

				if (target.amount + args.amount > target.limit)
					throw new Error(
						`specified amount (${args.amount}) increments beyond the limit ` +
							`(${target.limit}). current value: ${target.amount}`,
					);

				const updated = await FruitModel.findByIdAndUpdate(
					target._id,
					{
						[FruitKey.Amount]: target.amount + args.amount,
					},
					{ returnDocument: 'after' },
				);

				if (updated === null || updated === undefined)
					throw new Error(`update failed for fruit [${target.name}]`);

				return [updated].map(FruitMapper.toDomain).map(FruitMapper.toDTO)[0];
			},
		});
	},
});
