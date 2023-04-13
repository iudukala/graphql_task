import { extendType, stringArg, intArg, nonNull } from 'nexus';
import { GQLType } from '../common/enum_nexusTypeKey.js';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { GQLContextType } from '../common/type_GQLContextType.js';

import type { FruitConstructArgs } from '../../Fruit/types.js';
import { Fruit } from '../../Fruit/Fruit.js';
import { mapToPersistenceModel } from '../../persistence/mapToPersistenceModel.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { FruitModel } from '../../Fruit/mongooseFruitModel.js';
import { connectDB } from '../../persistence/connectDB.js';
import { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX.js';
import mongoose, { ObjectId, Types } from 'mongoose';

// type FruitModifyArgs = Omit<
// 	FruitConstructArgs,
// 	typeof FruitKey.Description | typeof FruitKey.Limit
// > & { [FruitKey.Amount]: number };

// export type FruitConstructArgs = Omit<
type FruitModifyArgs = Omit<
	FruitTypeGQL,
	typeof FruitKey.ID | typeof FruitKey.Limit | typeof FruitKey.Description
>;

/**
 * mutation for updating the the amount of an existing fruit.
 * structure: storeFruitToFruitStorage(name: string, amount: int)
 */
export const storeFruitToFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('storeFruitToFruitStorage', {
			type: GQLType.Fruit,

			args: <Record<keyof FruitModifyArgs, AllNexusArgsDefs>>{
				[FruitKey.Name]: nonNull(stringArg()),
				[FruitKey.Amount]: nonNull(intArg()),
			},

			resolve: async (_discard, args: FruitModifyArgs, context: GQLContextType) => {
				connectDB(context.DB_URI);

				const target = await FruitModel.findOne({ [FruitKey.Name]: args.name }).exec();

				if (target === null) throw new Error(`fruit not found for name: [${args.name}]`);

				if (target.amount + args.amount > target.limit)
					throw new Error(
						`specified amount (${args.amount}) increments beyond the limit (${target.limit}). current value: ${target.amount}`,
					);

				const updated = await FruitModel.findByIdAndUpdate(target._id, {
					[FruitKey.Amount]: target.amount + args.amount,
				});


				if (updated === null) throw new Error(`update failed for fruit [${target.name}]`);

				type T = typeof updated._id;

				type PersistenceFruit = Omit<FruitTypeGQL, typeof FruitKey.ID> & { _id: mongoose.Types.ObjectId};
				// type PersistenceFruit = typeof updated;
				const mapFromPersistenceResp = (fruit: PersistenceFruit): Fruit => {
					return Fruit.reconstituteFruit({
						id: fruit._id.toString(),
						[FruitKey.Name]: fruit.name,
						[FruitKey.Description]: fruit.description,
						[FruitKey.Limit]: fruit.limit,
						[FruitKey.Amount]: fruit.amount,
					});
				};

				type X = { a: number; b: number };
				type Y = { a: number };

				const x: X = { a: 1, b: 2 };
				// const x2: X = { a: 1, b: 2, c: 3 };
				const y: Y = x;

				// console.log(mapToPersistenceModel(mapFromPersistenceResp(updated)));
				return mapToPersistenceModel(mapFromPersistenceResp(updated));

				// return updated;
				// const y = await FruitModel.findById(x?._id);
				// console.log(y);

				throw new Error('not implemented');
				// const newFruit: Fruit = Fruit.createNewFruit(args);

				// // todo: persistence logic
				// const translated = translateFruit(newFruit);

				// context.fruits.push(translated);
				// return translated;
			},
		});
	},
});
