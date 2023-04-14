import mongoose from 'mongoose';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';
import { FruitKey } from '../Fruit/enum_fruitKey.js';

export type PersistenceFruitModel = Omit<FruitTypeGQL, typeof FruitKey.ID> & {
	_id: mongoose.Types.ObjectId;
};
