import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';
import { NexusGenObjects } from '../nexus_autogen_artifacts/nexus_typegen.js';

export type FruitTypeGQL = NexusGenObjects[typeof FRUIT_NAME];
