import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../common/enum_nexusTypeKey.js';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { mapToPersistenceModel } from '../../persistence/mapToPersistenceModel.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { FruitModel } from '../../Fruit/mongooseFruitModel.js';
import { connectDB } from '../../persistence/connectDB.js';
import { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX.js';
import { Fruit } from '../../Fruit/Fruit.js';

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
			type: GQLType.Fruit,

			args: <Record<keyof FruitModifyArgs, AllNexusArgsDefs>>{
				[FruitKey.Name]: nonNull(stringArg()),
				[FruitKey.Amount]: nonNull(intArg()),
			},

			resolve: async (_discard, args: FruitModifyArgs, context: GQLContextType) => {
				connectDB(context.DB_URI);

				const target = await FruitModel.findOne({ [FruitKey.Name]: args.name }).exec();

				if (target === null) throw new Error(`fruit not found for name: [${args.name}]`);

				if (target.amount - args.amount < 0)
					throw new Error(
						`specified amount (${args.amount}) deducts beyond zero. \
						current value: ${target.amount}`,
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
