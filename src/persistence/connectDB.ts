import mongoose from 'mongoose';

/**
 * function to reconnect to db if it's closed/closing
 *
 * @param {string} DB_URI connection uri
 */
export const connectDB = async (DB_URI: string | null | undefined): Promise<boolean> => {
	if (DB_URI === null || DB_URI === undefined) throw new Error('database connection string empty');

	try {
		// if in state 'disconnected' = 0 or 'disconnecting' = 3
		console.log('connectDB pre con : ' + mongoose.connection.readyState);
		if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
			// mongoose.connect(DB_URI);
			await mongoose.createConnection(DB_URI).asPromise();
			console.log('connectDB - should work : ' + mongoose.connection.readyState);
		}
		return true;
	} catch (error) {
		console.log('database connection failure: ' + error);
		return false;
	}
};
