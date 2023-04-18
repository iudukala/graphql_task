import { extendType, nonNull, stringArg } from 'nexus';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';
import { findFruitByName } from './helpers/findFruitByName.js';
import { FruitDTO } from '../../Fruit/types.js';
import { FruitMapper } from '../../Fruit/FruitMapper.js';

// todo: change to 'findFruit()'
export const findFruit = extendType({
	type: 'Query',

	definition(t) {
		t.nonNull.list.field('findFruit', {
			type: FRUIT_NAME,

			args: {
				[FruitKey.Name]: nonNull(stringArg()),
			},

			resolve: async (_discard, args: { [FruitKey.Name]: string }, context: GQLContextType) => {
				const target = await findFruitByName(args.name, context.DB_URI);
				return [FruitMapper.toPersistence(FruitMapper.toDomain(target)) as FruitDTO];
			},
		});
	},
});
