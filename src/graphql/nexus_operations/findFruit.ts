import { extendType, nonNull, stringArg } from 'nexus';
import { FruitMapper } from '../../Fruit/FruitMapper.js';
import { FruitRepo } from '../../Fruit/FruitRepository.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { FruitDTO } from '../../Fruit/types.js';
import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';
import { GQLContextType } from '../common/type_GQLContextType.js';

export const findFruit = extendType({
	type: 'Query',

	definition(t) {
		t.nonNull.list.field('findFruit', {
			type: FRUIT_NAME,

			args: {
				[FruitKey.Name]: nonNull(stringArg()),
			},

			resolve: async (
				_discard,
				args: { [FruitKey.Name]: string },
				context: GQLContextType,
			): Promise<Array<FruitDTO>> => {
				const target = await new FruitRepo(context.DB_URI).findFruitByName(args.name);
				return [target].map(FruitMapper.toDomain).map(FruitMapper.toDTO);
			},
		});
	},
});
