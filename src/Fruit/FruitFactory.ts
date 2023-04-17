import { randomUUID } from 'crypto.js';
import { FruitKey } from './enum_fruitKey.js';

import type { FruitConstructArgs } from './types.js';
import type { FruitTypeGQL } from '../graphql/nexus_types/type_FruitGQL.js';

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
