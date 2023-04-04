import { GQLType } from '../constants/enum_nexusTypeKey';
import { NexusGenObjects } from '../nexus_autogen/nexus-typegen';

export type FruitType = NexusGenObjects[GQLType.Fruit];
