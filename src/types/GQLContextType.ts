import { NexusGenObjects } from '../graphql/nexus_autogen_artifacts/nexus_typegen';
import { GQLType } from '../graphql/constants/enum_nexusTypeKey';

export type GQLContextType = {
	fruits: Array<NexusGenObjects[GQLType.Fruit]>;
};
