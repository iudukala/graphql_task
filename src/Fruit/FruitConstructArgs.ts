import { FruitKey } from '../graphql/constants/enum_fruitKey';
import type { FruitType } from '../graphql/nexus_types/FruitType';

export type FruitConstructArgs = Pick<
	FruitType,
	FruitKey.Name | FruitKey.Description | FruitKey.Limit
>;
