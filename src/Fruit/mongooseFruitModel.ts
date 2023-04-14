import mongoose, { model, Document, Schema, Model } from 'mongoose';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';
import { FruitKey } from './enum_fruitKey.js';

/**
 * mongoose model of Fruit type
 */
export type FruitModelType = Omit<FruitTypeGQL, typeof FruitKey.ID> & mongoose.Document;
export const FruitModel = mongoose.model<FruitModelType>(
	'Fruit',
	new mongoose.Schema<FruitTypeGQL>({
		name: String,
		description: String,
		limit: Number,
		amount: Number,
	}),
);
