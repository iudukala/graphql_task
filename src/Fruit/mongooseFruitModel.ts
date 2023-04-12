import mongoose from 'mongoose';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';

/**
 * mongoose model of Fruit type
 */
export const FruitModel = mongoose.model(
	'Fruit',
	new mongoose.Schema<FruitTypeGQL>({
		name: String,
		description: String,
		limit: Number,
		amount: Number,
	}),
);
