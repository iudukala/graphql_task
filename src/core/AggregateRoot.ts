import mongoose from 'mongoose';
import { DomainEventModel } from '../infrastructure/persistence/DomainEventModel.js';
import { DomainEvent } from './DomainEvent.js';
import { Entity } from './Entity.js';

export abstract class AggregateRoot<T> extends Entity<T> {
	private _domainEvents: Array<DomainEvent> = [];

	get domainEvents(): DomainEvent[] {
		return this._domainEvents;
	}

	public addDomainEvent(event: DomainEvent, session: mongoose.mongo.ClientSession): void {
		// this.domainEvents.push(event);
		// DomainEventManager.markAggregateForDispatch(this);

		new DomainEventModel({
			dateTimeOccured: new Date(),
			fruitID: this.id,
		}).save({ session: session });
	}
}
