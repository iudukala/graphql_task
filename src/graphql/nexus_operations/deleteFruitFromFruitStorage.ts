import { booleanArg, extendType, nonNull, stringArg } from 'nexus';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { FruitMapper } from '../../Fruit/FruitMapper.js';
import { FruitRepo } from '../../Fruit/FruitRepository.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { MUTATION_RETURN_TYPE_NAME } from '../nexus_types/MUTATION_RETURN_NAME.js';

type DeleteMutationArgs = { [FruitKey.Name]: string; forceDelete?: boolean | null };
/**
 * mutation for deleting a fruit.
 * structure: deleteFruitFromFruitStorage(name: string, forceDelete: boolean)
 */
export const deleteFruitFromFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('deleteFruitFromFruitStorage', {
			type: MUTATION_RETURN_TYPE_NAME,

			args: <Record<keyof DeleteMutationArgs, AllNexusArgsDefs>>{
				[FruitKey.Name]: nonNull(stringArg()),
				forceDelete: booleanArg(),
			},

			resolve: async (_, args: DeleteMutationArgs, context: GQLContextType) => {
				const repo = new FruitRepo(context.DB_URI);

				const target = await repo.findFruitByName(args.name);

				if (args.forceDelete || target.amount === 0) {
					const updated = await repo.delete(FruitMapper.toDomain(target));

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
