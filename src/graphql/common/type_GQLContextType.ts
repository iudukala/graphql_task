import { FruitTypeGQL } from '../nexus_types/FruitTypeGQLNX.js';

export type GQLContextType = {
	DB_URI: string;
	fruits: Array<FruitTypeGQL>;
};
