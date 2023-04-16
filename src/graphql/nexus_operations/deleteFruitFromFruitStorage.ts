import { extendType, stringArg, booleanArg, nonNull } from 'nexus';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { connectDB } from '../../persistence/connectDB.js';
import { FruitModel } from '../../Fruit/mongooseFruitModel.js';
import { findFruitByName } from './helpers/findFruitByName.js';

type DeleteMutationArgs = { [FruitKey.Name]: string; forceDelete?: boolean | null };
/**
 * mutation for deleting a fruit.
 * structure: deleteFruitFromFruitStorage(name: string, forceDelete: boolean)
 */
export const deleteFruitFromFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('deleteFruitFromFruitStorage', {
			type: 'String',

			args: <Record<keyof DeleteMutationArgs, AllNexusArgsDefs>>{
				[FruitKey.Name]: nonNull(stringArg()),
				forceDelete: booleanArg(),
			},

			resolve: async (_, args: DeleteMutationArgs, context: GQLContextType) => {
				const target = await findFruitByName(args.name, context.DB_URI);

				if (args.forceDelete || target.amount === 0) {
					const updated = await FruitModel.findByIdAndDelete(target._id);

					if (updated === null) throw new Error(`delete failed for fruit [${target.name}]`);
					else return `delete successful for fruit ${target.name} with id [${target._id}]`;
				}





				return (
					`fruit name: ${target.name} has an amount of ${target.amount}.` +
					`cannot delete fruits with an amount > 0 if 'forceDelete: true' is not specified`
				);
			},
		});
	},
});
