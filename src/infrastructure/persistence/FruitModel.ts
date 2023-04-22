import mongoose from 'mongoose';
import { FruitModelType, FruitDTO } from '../../Fruit/types.js';

export const FruitModel = mongoose.model<FruitModelType>(
	'fruit',
	new mongoose.Schema<FruitDTO>({
		name: String,
		description: String,
		limit: Number,
		amount: Number,
	}),
	'fruit',
);
