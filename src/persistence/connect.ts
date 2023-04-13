import mongoose from 'mongoose';
import { DB_URI } from '../index.js';

/**
 * function to reconnect to db if it's closed/closing
 */
export const connect = async (DB_URI: string) => {
	// if in state 'disconnected' = 0 or 'disconnecting' = 3
	if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3)
		await mongoose.connect(DB_URI);
};
