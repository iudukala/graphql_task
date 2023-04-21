import { Entity } from './Entity.js';

export interface DomainEvent {
	dateTimeOccured: Date;
	getEntityID: () => Entity<unknown>['id'];
}
