import mongoose from 'mongoose';
import { FruitCreatedEvent } from '../../Fruit/FruitCreatedEvent.js';

export const DomainEventModel = mongoose.model(
	'domain_event',
	new mongoose.Schema<FruitCreatedEvent>({
		fruitID: String,
		dateTimeOccured: Date,
	}),
	'outbox',
);
