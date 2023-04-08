import { randomUUID } from 'crypto';
import { FruitKey } from '../graphql/constants/enum_fruitKey';

import type { FruitConstructArgs } from './types.js';
import type { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';

/**
 *
 * @param {FruitConstructArgs} constructionProps an object containing the data required to build a
 * new fruit object (all fields excluding the ID and amount)
 * @returns {FruitTypeGQL} a Fruit object
 */
export function obsolete_FruitFactory(constructionProps: FruitConstructArgs): FruitTypeGQL {
	return {
		[FruitKey.ID]: randomUUID(),
		[FruitKey.Amount]: 0,

		...constructionProps,
	};
}
