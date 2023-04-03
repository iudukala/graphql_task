import { GQLNexusTypeName } from '../constants/enum_nexus_type_keys';
import { NexusGenObjects } from '../nexus_autogen/nexus-typegen';
import { GQL_IDKEY } from '../constants/gqlIDKey';

export type IDOmittedNexusType<T extends GQLNexusTypeName> = Omit<NexusGenObjects[T], typeof GQL_IDKEY>;
