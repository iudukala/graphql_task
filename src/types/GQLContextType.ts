import { NexusGenObjects } from '../graphql/nexus_autogen/nexus-typegen';
import { GQLType } from '../graphql/constants/enum_nexusTypeKey';

export type GQLContextType = {
	fruits: Array<NexusGenObjects[GQLType.Fruit]>;
};
