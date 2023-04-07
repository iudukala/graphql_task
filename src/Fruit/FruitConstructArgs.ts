import { FruitKey } from '../graphql/constants/enum_fruitKey';
import type { FruitType } from '../graphql/nexus_types/FruitType';

export type FruitConstructArgs = Omit<FruitType, typeof FruitKey.ID | typeof FruitKey.Amount>;
