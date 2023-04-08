import { GQLType } from '../constants/enum_nexusTypeKey.js';
import { NexusGenObjects } from '../nexus_autogen_artifacts/nexus_typegen.js';

export type FruitTypeGQL = NexusGenObjects[typeof GQLType.Fruit];
