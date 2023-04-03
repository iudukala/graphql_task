import { v4 as uuid } from 'uuid';
import { NexusGenObjects } from './graphql/nexus_autogen/nexus-typegen';
import { GQLNexusTypeName } from './graphql/enum_nexus_type_keys';
import { GQL_IDKEY } from './graphql/const/gqlIDKey';

export const tempDataFruit: Array<NexusGenObjects[GQLNexusTypeName.Fruit]> = [
	{
		[GQL_IDKEY]: 'bb6b88fa-ac50-4c7e-9aa8-74c41d145e59',
		name: 'apple',
		description: 'apples the fruit',
		amount: 1,
	},
	{
		[GQL_IDKEY]: 'e61c418d-a660-42fc-8e38-d0be8652238a',
		name: 'orange',
		description: 'oranges the fruit',
		amount: 15,
	},
	{
		[GQL_IDKEY]: '1a57265b-3f85-4f46-944b-ba34f8e9f6cb',
		name: 'pineapple',
		description: 'apples the fruit',
		amount: 1,
	},
	{
		[GQL_IDKEY]: uuid(),
		name: 'some other apple',
		description: 'apples the fruit',
		amount: 1,
	},
];
// 	{
// 	[GQLIDKEY]: uuid(),
// 		name: 'some other apple',
// 		description: 'apples the fruit',
// 		amount: 1,
// 	},
// 	{
// 	[GQLIDKEY]: uuid(),
// 		name: 'different orange',
// 		description: 'apples the fruit',
// 		amount: 1,
// 	},
// 	{
// 	[GQLIDKEY]: uuid(),
// 		name: 'some fruit',
// 		description: 'apples the fruit',
// 		amount: 1,
// 	},
// 	{
// 	[GQLIDKEY]: uuid(),
// 		name: 'tomato',
// 		description: 'apples the fruit',
// 		amount: 1,
// 	},
// ];
