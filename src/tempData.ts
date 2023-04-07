import { randomUUID } from 'crypto';
import { FruitKey } from './graphql/constants/enum_fruitKey';

import type { FruitTypeGQL } from './graphql/nexus_types/FruitTypeGQLNX';

export const tempDataFruit: Array<FruitTypeGQL> = [
	{
		[FruitKey.ID]: 'bb6b88fa-ac50-4c7e-9aa8-74c41d145e59',
		name: 'apple',
		description: 'apples the fruit',
		amount: 1,
		limit: 10,
	},
	{
		[FruitKey.ID]: 'e61c418d-a660-42fc-8e38-d0be8652238a',
		name: 'orange',
		description: 'oranges the fruit',
		amount: 15,
		limit: 10,
	},
	{
		[FruitKey.ID]: '1a57265b-3f85-4f46-944b-ba34f8e9f6cb',
		name: 'pineapple',
		description: 'apples the fruit',
		amount: 1,
		limit: 10,
	},
	{
		[FruitKey.ID]: randomUUID(),
		name: 'some other apple',
		description: 'apples the fruit',
		amount: 1,
		limit: 10,
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
