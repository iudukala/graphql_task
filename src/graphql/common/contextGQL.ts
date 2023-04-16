import { GQLContextType } from './type_GQLContextType.js';
import { fruitSampleData } from '../../__tests__/helpers/sampleDataFruit.js';
import dotenv from 'dotenv';

// fetching environment variables set in the .env file
dotenv.config();
if (process.env['DB_URI'] === null || process.env['DB_URI'] === undefined)
	throw new Error('database connection string empty');

/**
 * context object for graphQL. file name and variable name (contextGQL) changes must be reflected in the nexus makeSchema() call
 */
export const contextGQL: GQLContextType = {
	DB_URI: process.env['DB_URI'],
	fruits: fruitSampleData,
};
