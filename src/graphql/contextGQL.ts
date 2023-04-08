import { GQLContextType } from '../types/GQLContextType.js';
import { tempDataFruit } from '../tempData.js';

/**
 * context object for graphQL. file name and variable name (contextGQL) changes must be reflected in the nexus makeSchema() call
 */
export const contextGQL: GQLContextType = {
	fruits: tempDataFruit,
};
