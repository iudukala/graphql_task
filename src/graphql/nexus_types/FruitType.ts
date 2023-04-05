import { GQLType } from '../constants/enum_nexusTypeKey';
import { NexusGenObjects } from '../nexus_autogen_artifacts/nexus_typegen';

export type FruitType = NexusGenObjects[GQLType.Fruit];
