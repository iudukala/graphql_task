import mongoose from 'mongoose';
import { FruitModel } from '../infrastructure/persistence/FruitModel.js';
import { connectDB } from '../infrastructure/persistence/connectDB.js';
import { Fruit } from './Fruit.js';
import { FruitMapper } from './FruitMapper.js';
import { FruitKey } from './enum_fruitKey.js';
import { FRUIT_MUTATION_EVENT, FruitMutatedEvent } from './events/FruitMutatedEvent.js';
import { FruitInternalProps, FruitModelType } from './types.js';

export class FruitRepo {
	static ATOMIC_TRANSACTION_FLAG: boolean | undefined;
	private readonly DB_URI: string;

	constructor(DB_URI: string) {
		this.DB_URI = DB_URI;
	}

	/**
	 * @description checks if a fruit with the same name exists. (fruit names are unique)
	 * @param fruitName fruitname to check
	 * @returns whether it exists
	 */
	exists = async (fruitName: string): Promise<boolean> => {
		await connectDB(this.DB_URI);

		return !!(await FruitModel.findOne({ [FruitKey.Name]: fruitName }, undefined).exec());
	};

	/**
	 * @description locates a fruit by it's name
	 * @param fruitName the name to query for
	 * @param session optional mongoose session object if part of atomic transaction
	 */
	findFruitByName = async (
		fruitName: string,
		session?: mongoose.mongo.ClientSession,
	): Promise<FruitModelType> => {
		await connectDB(this.DB_URI);
		const target = await FruitModel.findOne({ [FruitKey.Name]: fruitName }, undefined, {
			session: session,
		}).exec();

		if (target === null || target === undefined)
			throw new Error(`fruit not found for name: [${fruitName}]`);

		return target;
	};

	/**
	 * @description takes a fruit and commits it to the database. would make sense to convert this to a generic function but currently the only domain entity is fruit.
	 * @param fruit fruit object
	 * @param updateData data to update fruit with (if updating existing fruit)
	 * @param session optional mongoose session object if part of atomic transaction
	 * @returns  the committed object cast to a form that the nexus resolvers recognize
	 */
	save = async (
		fruit: Fruit,
		updateData?: Partial<FruitInternalProps>,
	): Promise<FruitModelType> => {
		await connectDB(this.DB_URI);

		const session: mongoose.mongo.ClientSession | undefined = await (async () => {
			if (FruitRepo.ATOMIC_TRANSACTION_FLAG) {
				const innerSession = await mongoose.startSession();
				innerSession.startTransaction();

				return innerSession;
			}

			return undefined;
		})();

		if (updateData) {
			const updated = await FruitModel.findByIdAndUpdate(fruit.id, updateData, {
				returnDocument: 'after',
				session: session,
			});
			if (updated === null) throw new Error(`update failed for fruit [${fruit.props.name}]`);

			// adding a domain event to outbox to be raised

			// await new DomainEventModel(new FruitMutatedEvent(fruit, FRUIT_MUTATION_EVENT.UPDATED)).save();
			await fruit.addDomainEvent(
				new FruitMutatedEvent(fruit, FRUIT_MUTATION_EVENT.DELETED),
				session,
			);
			return updated;
		}

		// console.log(DomainEventManager.ATOMIC_TRANSACTION_FLAG);
		// mod

		const fruitToCommit: FruitModelType = FruitMapper.toPersistence(fruit);
		// .save({
		// 	session: session,
		// });

		try {
			// const committed: FruitModelType = await FruitMapper.toPersistence(fruit)
			await fruitToCommit.save({ session: session });

			// .catch(error => {
			// 	throw new Error('database commit failed: ' + error);
			// });

			// adding a domain event to outbox to be raised
			await fruit.addDomainEvent(
				new FruitMutatedEvent(fruit, FRUIT_MUTATION_EVENT.CREATED),
				session,
			);

			await session?.commitTransaction();
		} catch (exception) {
			await session?.abortTransaction();
			throw new Error(
				`database commit failed. transaction mode flag: ${FruitRepo.ATOMIC_TRANSACTION_FLAG}\n` +
					exception,
			);
		} finally {
			await session?.endSession();
		}

		// const committed: FruitModelType = await FruitMapper.toPersistence(fruit)
		// 	.save({ session: session })
		// 	.catch(error => {
		// 		throw new Error('database commit failed: ' + error);
		// 	});
		// // adding a domain event to outbox to be raised
		// await new DomainEventModel(new FruitMutatedEvent(fruit, FRUIT_MUTATION_EVENT.CREATED)).save();

		mongoose.connection.close();
		return fruitToCommit;
	};

	/**
	 *
	 * @param fruit fruit to delete
	 * @param session optional mongoose session object if part of atomic transaction
	 * @returns deleted fruit model returned from mongoose
	 */
	delete = async (
		fruit: Fruit,
		session?: mongoose.mongo.ClientSession,
	): Promise<FruitModelType> => {
		await connectDB(this.DB_URI);
		const target = await this.findFruitByName(fruit.props.name, session);

		// if (DomainEventManager.ATOMIC_TRANSACTION_FLAG) {
		// 	const session = await mongoose.startSession();
		// 	session.startTransaction();
		// }
		const deleted = await FruitModel.findByIdAndDelete(target._id, { session: session });
		// adding a domain event to outbox to be raised
		// await fruit.addDomainEvent(new FruitMutatedEvent(fruit, FRUIT_MUTATION_EVENT.DELETED), session);

		if (deleted === null) throw new Error(`delete failed for fruit [${target.name}]`);

		return deleted;
	};
}
