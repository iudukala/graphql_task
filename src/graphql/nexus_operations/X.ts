import { extendType, nonNull, stringArg } from 'nexus';
import { Fruit } from '../../Fruit/Fruit.js';
import { FruitMapper } from '../../Fruit/FruitMapper.js';
import { FruitRepo } from '../../Fruit/FruitRepository.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { FruitDTO } from '../../Fruit/types.js';
import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';
import { GQLContextType } from '../common/type_GQLContextType.js';

type FruitUpdateArgs = Partial<Omit<FruitDTO, typeof FruitKey.ID | typeof FruitKey.Amount>> & {
	// [FruitKey.Name]: FruitDTO[typeof FruitKey.Name];
	[FruitKey.Name]: string;
};
/**
 * mutation for updating the description and/or limit of an existing fruit.
 * signature : updateFruitForFruitStorage(name: string, description: string, limit: int)
 */
export const updateFruitForFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('updateFruitForFruitStorage', {
			type: FRUIT_NAME,

			// args: <Record<keyof FruitUpdateArgs, AllNexusArgsDefs>>{
			args:{
				[FruitKey.Name]: nonNull(stringArg()),
				[FruitKey.Description]: nonNull(stringArg()),
			},

			resolve: async (
				_discard,
				// args: FruitUpdateArgs,
				args: { name: string; limit: number; description: string },
				context: GQLContextType,
			): Promise<FruitDTO> => {
				const repo = new FruitRepo(context.DB_URI);
				const target = FruitMapper.toDomain(await repo.findFruitByName(args.name));

				// if (target.props.amount + args.amount > target.props.limit)
				// 	throw new Error(
				// 		`specified amount (${args.amount}) increments beyond the limit ` +
				// 			`(${target.props.limit}). current value: ${target.props.amount}`,
				// 	);

				const updated = await repo.save(target, {
					[FruitKey.Description]: 's',
					// ? FruitDescriptionVO.create(args.description).value
					// : undefined,
					// [FruitKey.Limit]: args.limit ? args.limit : undefined,
					[FruitKey.Limit]: 55,
				});
				const x = Fruit.createNewFruit({
					name: 'apple',
					description: 'apple, the fruit',
					limit: 10,
				});

				// return [updated].map(FruitMapper.toDomain).map(FruitMapper.toDTO)[0] as FruitDTO;
				return FruitMapper.toDTO(x);
			},
		});
	},
});
