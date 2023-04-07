import { FruitKey } from '../graphql/constants/enum_fruitKey';
import type { FruitType } from '../graphql/nexus_types/FruitType';

export type FruitConstructArgs = Pick<
	FruitType,
	typeof FruitKey.Name | typeof FruitKey.Description | typeof FruitKey.Limit
>;
