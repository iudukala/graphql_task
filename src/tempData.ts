import { randomUUID } from 'crypto';
import { FruitKey } from './Fruit/enum_fruitKey.js';

import type { FruitTypeGQL } from './graphql/nexus_types/FruitTypeGQLNX.js';
import { Fruit } from './Fruit/Fruit.js';

export const tempDataFruit: Array<Fruit> = [
	Fruit.createNewFruit({
		name: 'apple',
		description: 'apple, the fruit',
		limit: 10,
	}),

	Fruit.createNewFruit({
		name: 'orange',
		description: 'orange, the fruit',
		limit: 30,
	}),
	Fruit.createNewFruit({
		name: 'pineapple',
		description: 'pineapple, the fruit',
		limit: 20,
	}),
	Fruit.createNewFruit({
		name: 'watermelon',
		description: 'watermelon, the fruit',
		limit: 10,
	}),
	Fruit.createNewFruit({
		name: 'peach',
		description: 'peach, the fruit',
		limit: 70,
	}),
];
// export const tempDataFruit: Array<FruitTypeGQL> = [
// 	Fruit.createNewFruit()
// 	{
// 		[FruitKey.ID]: 'bb6b88fa-ac50-4c7e-9aa8-74c41d145e59',
// 		name: 'apple',
// 		description: 'apples the fruit',
// 		amount: 1,
// 		limit: 10,
// 	},
// 	{
// 		[FruitKey.ID]: 'e61c418d-a660-42fc-8e38-d0be8652238a',
// 		name: 'orange',
// 		description: 'oranges the fruit',
// 		amount: 15,
// 		limit: 10,
// 	},
// 	{
// 		[FruitKey.ID]: '1a57265b-3f85-4f46-944b-ba34f8e9f6cb',
// 		name: 'pineapple',
// 		description: 'apples the fruit',
// 		amount: 1,
// 		limit: 10,
// 	},
// 	{
// 		[FruitKey.ID]: randomUUID(),
// 		name: 'some other apple',
// 		description: 'apples the fruit',
// 		amount: 1,
// 		limit: 10,
// 	},
// ];
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
