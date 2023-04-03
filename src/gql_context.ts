import { GQLContextType } from '.';
import { tempDataFruit } from './tempData';

export const context: GQLContextType = {
	fruits: tempDataFruit,
};
