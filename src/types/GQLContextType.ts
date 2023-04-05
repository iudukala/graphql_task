import { NexusGenObjects } from '../graphql/nexus_autogen_artifacts/nexus_typegen.ts';
import { GQLType } from '../graphql/constants/enum_nexusTypeKey';

export type GQLContextType = {
	fruits: Array<NexusGenObjects[GQLType.Fruit]>;
};
