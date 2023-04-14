import mongoose from 'mongoose';

/**
 * function to reconnect to db if it's closed/closing
 *
 * @param {string} DB_URI connection uri
 */
export const connectDB = async (DB_URI: string | null | undefined) => {
	if (DB_URI === null || DB_URI === undefined) throw new Error('database connection string empty');

	try {
		// if in state 'disconnected' = 0 or 'disconnecting' = 3
		// console.log('connectDB pre con : ' + mongoose.connection.readyState);

		if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
			await mongoose.connect(DB_URI);
			// mongoose.createConnection(DB_URI);

			// console.log('connectDB - should work : ' + mongoose.connection.readyState);
		}
	} catch (error) {
		// console.log('database connection failure: ' + error);
	}
};
