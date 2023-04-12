import mongoose from 'mongoose';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';

export const FruitModel = mongoose.model(
	'Fruit',
	new mongoose.Schema<FruitTypeGQL>({
		name: String,
		description: String,
		limit: Number,
		amount: Number,
	}),
);
