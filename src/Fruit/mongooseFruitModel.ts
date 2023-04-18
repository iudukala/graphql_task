import mongoose from 'mongoose';
import { FruitTypeGQL } from '../graphql/nexus_types/type_FruitGQL.js';
import { FruitModelType } from './types.js';

export const FruitModel = mongoose.model<FruitModelType>(
	'Fruit',
	new mongoose.Schema<FruitTypeGQL>({
		name: String,
		description: String,
		limit: Number,
		amount: Number,
	}),
	'Fruit',
);
