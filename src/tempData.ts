import { v4 as uuid } from 'uuid';
import { NexusGenObjects } from './graphql/nexus_autogen/nexus-typegen';
import { GQLNexusType } from './graphql/nexus_type_keys';

export const tempDataFruit: Array<NexusGenObjects[GQLNexusType.Fruit]> = [
	{
		id: uuid(),
		name: 'apple',
		description: 'apples the fruit',
		amount: 1,
	},
	{
		id: uuid(),
		name: 'orange',
		description: 'oranges the fruit',
		amount: 15,
	},
	{
		id: uuid(),
		name: 'pineapple',
		description: 'apples the fruit',
		amount: 1,
	},
	{
		id: uuid(),
		name: 'some other apple',
		description: 'apples the fruit',
		amount: 1,
	},
	{
		id: uuid(),
		name: 'different orange',
		description: 'apples the fruit',
		amount: 1,
	},
	{
		id: uuid(),
		name: 'some fruit',
		description: 'apples the fruit',
		amount: 1,
	},
	{
		id: uuid(),
		name: 'tomato',
		description: 'apples the fruit',
		amount: 1,
	},
];
