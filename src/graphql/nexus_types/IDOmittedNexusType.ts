import { GQLType } from '../constants/enum_nexusTypeKey';
import { NexusGenObjects } from '../nexus_autogen/nexus-typegen';
import { GQL_IDKEY } from '../constants/GQL_IDKey';

export type IDOmittedNexusType<T extends GQLType> = Omit<NexusGenObjects[T], typeof GQL_IDKEY>;
