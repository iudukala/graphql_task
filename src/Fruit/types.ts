import { FruitKey } from './enum_fruitKey.js';

import type { FruitTypeGQL } from '../graphql/nexus_types/type_FruitGQL.js';
import type { FruitDescriptionVO } from './FruitDescriptionVO.js';

/**
 * type of an object containing the data required to construct a new fruit object. used by the fruit factory function and is also the type of the parameters passed through the mutation to add a new fruit.
 *
 * amount is zero when built and is therefor not necessary to be passed to the constructor
 *
 */
export type FruitConstructArgs = Omit<FruitTypeGQL, typeof FruitKey.ID | typeof FruitKey.Amount>;

/**
 * constructing a mapped type based on the graphql Fruit object emitted by nexus where the id field is removed and the field 'description' is replaced with a value object to allow constraints to be enforced
 */
export type FruitInternalProps = Omit<
	FruitTypeGQL,
	typeof FruitKey.Description | typeof FruitKey.ID
> & {
	[FruitKey.Description]: FruitDescriptionVO;
};
