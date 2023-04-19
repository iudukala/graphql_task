import mongoose from 'mongoose';
import { connectDB } from '../persistence/connectDB.js';
import { Fruit } from './Fruit.js';
import { FruitMapper } from './FruitMapper.js';
import { FruitKey } from './enum_fruitKey.js';
import { FruitModel } from './mongooseFruitModel.js';
import { FruitInternalProps, FruitModelType } from './types.js';

export class FruitRepo {
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
		return !!(await this.findFruitByName(fruitName));
	};

	/**
	 * @description locates a fruit by it's name
	 * @param fruitName the name to query for
	 */
	findFruitByName = async (fruitName: string): Promise<FruitModelType> => {
		await connectDB(this.DB_URI);
		const target = await FruitModel.findOne({ [FruitKey.Name]: fruitName }).exec();

		if (target === null || target === undefined)
			throw new Error(`fruit not found for name: [${fruitName}]`);

		return target;
	};

	/**
	 * @description takes a fruit and commits it to the database. would make sense to convert this to a generic function but currently the only domain entity is fruit.
	 * @param fruit fruit object
	 * @param updateData data to update fruit with (if updating existing fruit)
	 * @returns  the committed object cast to a form that the nexus resolvers recognize
	 */
	commitToPersistence = async (
		fruit: Fruit,
		updateData?: Partial<FruitInternalProps>,
	): Promise<FruitModelType> => {
		//todo: validation through domain service
		await connectDB(this.DB_URI);

		if (updateData) {
			const updated = await FruitModel.findByIdAndUpdate(fruit.id, updateData, {
				returnDocument: 'after',
			});
			// .lean();
			if (updated === null) throw new Error(`update failed for fruit [${fruit.props.name}]`);

			return updated;
		}

		const committed: FruitModelType = await FruitMapper.toPersistence(fruit)
			.save()
			.catch(error => {
				throw new Error('database commit failed: ' + error);
			});

		mongoose.connection.close();
		return committed;
	};

	/**
	 *
	 * @param fruit fruit to delete
	 * @returns deleted fruit model returned from mongoose
	 */
	delete = async (fruit: Fruit): Promise<FruitModelType> => {
		await connectDB(this.DB_URI);
		const target = await this.findFruitByName(fruit.props.name);

		const deleted = await FruitModel.findByIdAndDelete(target._id);
		if (deleted === null) throw new Error(`delete failed for fruit [${target.name}]`);

		return deleted;
	};
}
