import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { mapToPersistenceModel } from '../../persistence/mapToPersistenceModel.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { FruitModel } from '../../Fruit/mongooseFruitModel.js';
import { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX.js';
import { Fruit } from '../../Fruit/Fruit.js';
import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';
import { findFruitByName } from './helpers/findFruitByName.js';

type FruitModifyArgs = Omit<
	FruitTypeGQL,
	typeof FruitKey.ID | typeof FruitKey.Limit | typeof FruitKey.Description
>;

/**
 * mutation for updating the the amount of an existing fruit.
 *
 * signature : removeFruitFromFruitStorage(name: string, amount: int)
 */
export const removeFruitFromFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('removeFruitFromFruitStorage', {
			type: FRUIT_NAME,

			args: <Record<keyof FruitModifyArgs, AllNexusArgsDefs>>{
				[FruitKey.Name]: nonNull(stringArg()),
				[FruitKey.Amount]: nonNull(intArg()),
			},

			resolve: async (_discard, args: FruitModifyArgs, context: GQLContextType) => {
				const target = await findFruitByName(args.name, context.DB_URI);

				if (target.amount - args.amount < 0)
					throw new Error(
						`specified amount (${args.amount}) deducts beyond zero.` +
							`current value: ${target.amount}`,
					);

				const updated = await FruitModel.findByIdAndUpdate(
					target._id,
					{
						[FruitKey.Amount]: target.amount - args.amount,
					},
					{ returnDocument: 'after' },
				).lean();

				if (updated === null) throw new Error(`update failed for fruit [${target.name}]`);

				return mapToPersistenceModel(Fruit.reconstituteFruit(updated)) as FruitTypeGQL;
			},
		});
	},
});
