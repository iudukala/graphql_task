import mongoose from 'mongoose';
import { DomainEventModel } from '../infrastructure/persistence/DomainEventModel.js';
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

	public async addDomainEvent(
		event: DomainEvent,
		session?: mongoose.mongo.ClientSession,
	): Promise<void> {
		// const session = await mongoose.startSession();
		// session.startTransaction();

		// try {
		await new DomainEventModel(event).save({ session: session });
		// } catch (error) {
		// console.log
		// }

		// this.domainEvents.push(event);
		// DomainEventManager.markAggregateForDispatch(this);
		//
		// 	new DomainEventModel({
		// 		dateTimeOccured: event.dateTimeOccured,
		// 		fruitID: event.getEntityID(),
		// 	}).save({ session: session });
	}
}

// const registerCustomer = async (req, res) => {
// 	const session = await mongoose.startSession();
// 	session.startTransaction();
// 	try {
// 		await CustomerRegistrationCode.findByIdAndUpdate(req.body._id, { used: true }, { session });
// 		const customer = await Customer.create({ firstName: req.body.firstName }, { session });
// 		await session.commitTransaction();
// 	} catch (error) {
// 		console.error('abort transaction');
// 		await session.abortTransaction();
// 	} finally {
// 		session.endSession();
// 	}
// };
