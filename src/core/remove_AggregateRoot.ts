import mongoose from 'mongoose';
import { DomainEvent } from './DomainEvent.js';
import { Entity } from './Entity.js';

/**
 * abstract class for entities that act as the aggregate root. not functionally necessary currently since the domain only contains one entities.
 */
export abstract class AggregateRoot<T> extends Entity<T> {
	private _domainEvents: Array<DomainEvent> = [];

	get domainEvents(): DomainEvent[] {
		return this._domainEvents;
	}

	public addDomainEvent(event: DomainEvent, session: mongoose.mongo.ClientSession): void {
		// this.domainEvents.push(event);
		// DomainEventManager.markAggregateForDispatch(this);
		//
		// 	new DomainEventModel({
		// 		dateTimeOccured: event.dateTimeOccured,
		// 		fruitID: event.getEntityID(),
		// 	}).save({ session: session });


	}
}
