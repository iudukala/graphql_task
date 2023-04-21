import mongoose from 'mongoose';
import { FruitMutatedEvent } from '../../Fruit/FruitCreatedEvent.js';

export const FruitEventModel = mongoose.model(
	'domain_event',
	new mongoose.Schema<FruitMutatedEvent>({
		fruitID: String,
		dateTimeOccured: Date,
		mutationType: String,
	}),
	'outbox',
);
