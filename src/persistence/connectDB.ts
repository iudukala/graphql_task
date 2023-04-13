import mongoose from 'mongoose';

/**
 * function to reconnect to db if it's closed/closing
 *
 * @param {string} DB_URI connection uri
 */
export const connectDB = async (DB_URI: string) => {
	// if in state 'disconnected' = 0 or 'disconnecting' = 3
	if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3)
		await mongoose.connect(DB_URI);
};
