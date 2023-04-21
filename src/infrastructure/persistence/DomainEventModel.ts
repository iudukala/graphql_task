import mongoose from 'mongoose';
import { FruitMutatedEvent } from '../../Fruit/events/FruitMutatedEvent.js';

export const DomainEventModel = mongoose.model(
	'domain_event',
	new mongoose.Schema<FruitMutatedEvent>({
		fruitID: String,
		dateTimeOccured: Date,
		mutationType: String,
	}),
	'outbox',
);
