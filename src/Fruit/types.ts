import mongoose from 'mongoose';
import { FruitKey } from './enum_fruitKey.js';
import type { FruitDescriptionVO } from './FruitDescriptionVO.js';
import { FruitTypeGQL } from '../graphql/nexus_types/type_FruitGQL.js';

/**
 * type of an object containing the data required to construct a new fruit object. used by the fruit factory function and is also the type of the parameters passed through the mutation to add a new fruit.
 *
 * amount is zero when built and is therefor not necessary to be passed to the constructor
 *
 */
export type FruitConstructArgs = Omit<FruitTypeGQL, typeof FruitKey.ID | typeof FruitKey.Amount>;

/**
 * constructing a mapped type based on the graphql Fruit object emitted by nexus where the id field is removed and the field 'description' is replaced with a value object to allow constraints to be enforced
 */
export type FruitInternalProps = Omit<
	FruitTypeGQL,
	typeof FruitKey.Description | typeof FruitKey.ID
> & {
	[FruitKey.Description]: FruitDescriptionVO;
};

export type PersistenceFruitModel = Omit<FruitTypeGQL, typeof FruitKey.ID> & {
	_id: mongoose.Types.ObjectId;
};

/**
 * mongoose model of Fruit type
 */
export type FruitModelType = Omit<FruitTypeGQL, typeof FruitKey.ID> & mongoose.Document;
