import { randomUUID } from 'crypto';
import { FruitKey } from '../constants/enum_fruitKey';
import type { FruitType } from '../nexus_types/FruitType';
import { FruitArgs } from './createFruitForFruitStorage';

/**
 *
 * @param constructionProps: an object containing the data required to build a new fruit object.
 * (all fields excluding the ID and amount)
 * @returns a Fruit object
 */
export function FruitFactory(constructionProps: FruitArgs): FruitType {
	return {
		[FruitKey.ID]: randomUUID(),
		[FruitKey.Amount]: 0,

		...constructionProps,
	};
}
