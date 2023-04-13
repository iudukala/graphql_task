import { GQLContextType } from './type_GQLContextType.js';
import { tempDataFruit } from '../../tempData.js';

/**
 * context object for graphQL. file name and variable name (contextGQL) changes must be reflected in the nexus makeSchema() call
 */

export const contextGQL: GQLContextType = {
	DB_URI: 'mongodb://myTester:test@127.0.0.1:27017/test' as const,
	fruits: tempDataFruit,
};
