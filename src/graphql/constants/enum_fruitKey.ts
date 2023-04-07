import { GQL_IDKEY } from './const_GQLIDKey';

export const FruitKey =  {
	ID : GQL_IDKEY,
	Name : 'name',
	Description : 'description',
	Limit : 'limit',
	Amount : 'amount',
} as const;
