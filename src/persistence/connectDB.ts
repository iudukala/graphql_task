import mongoose from 'mongoose';

/**
 * @description function to reconnect to db if it's closed/closing
 * @param DB_URI connection uri
 */
export const connectDB = async (DB_URI: string | null | undefined) => {
	if (DB_URI === null || DB_URI === undefined) throw new Error('database connection string empty');

	try {
		// if in state 'disconnected' = 0 or 'disconnecting' = 3
		if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
			await mongoose.connect(DB_URI);
		}
	} catch (error) {
		console.log('database connection failure: ' + error);
	}
};
