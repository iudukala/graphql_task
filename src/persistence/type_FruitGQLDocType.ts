import mongoose from 'mongoose';
import { FruitTypeGQL } from '../graphql/nexus_types/type_FruitGQL.js';
import { FruitKey } from '../Fruit/enum_fruitKey.js';

export type FruitGQLDocType = mongoose.Document<Omit<FruitTypeGQL, typeof FruitKey.ID>>
