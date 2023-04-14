import { Fruit } from '../../Fruit/Fruit.js';

export type GQLContextType = {
	DB_URI: string;
	fruits: Array<Fruit>;
};
