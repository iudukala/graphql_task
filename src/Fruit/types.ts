import { FruitKey } from '../graphql/constants/enum_fruitKey';

import type { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX';
import type { FruitDescriptionVO } from './FruitDescriptionVO';

export type FruitConstructArgs = Omit<FruitTypeGQL, typeof FruitKey.ID | typeof FruitKey.Amount>;

export type FruitInternalProps = Omit<FruitTypeGQL, typeof FruitKey.Description> & {
	[FruitKey.Description]: FruitDescriptionVO;
};
