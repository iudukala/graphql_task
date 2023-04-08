import { FruitKey } from '../graphql/constants/enum_fruitKey';

import type { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX';
import type { FruitDescriptionVO } from './FruitDescriptionVO';

/**
 * type object accepted by the fruit factory function. amount is zero when built and is therefor not necessary to be passed to the constructor
 */
export type FruitConstructArgs = Omit<FruitTypeGQL, typeof FruitKey.ID | typeof FruitKey.Amount>;

/**
 * constructing a mapped type based on the graphql Fruit object emitted by nexus where the string field 'description' is replaced with a value object to enforce constraints on it
 */
export type FruitInternalProps = Omit<FruitTypeGQL, typeof FruitKey.Description> & {
	[FruitKey.Description]: FruitDescriptionVO;
};
