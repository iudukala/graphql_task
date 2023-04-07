import { FruitKey } from '../graphql/constants/enum_fruitKey';
import type { FruitTypeGQL } from '../graphql/nexus_types/FruitType';

export type FruitConstructArgs = Omit<FruitTypeGQL, typeof FruitKey.ID | typeof FruitKey.Amount>;
