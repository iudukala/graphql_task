import { DomainEvents } from './DomainEvents.js';
import { Entity } from './Entity.js';
import { IDomainEvent } from './IDomainEvent.js';

export abstract class AggregateRoot<T> extends Entity<T> {
	private _domainEvents: Array<IDomainEvent> = [];

	get domainEvents(): IDomainEvent[] {
		return this._domainEvents;
	}

	protected addDomainEvent(event: IDomainEvent): void {
		this.domainEvents.push(event);
		DomainEvents.markAggregateForDispatch(this);
	}
}
