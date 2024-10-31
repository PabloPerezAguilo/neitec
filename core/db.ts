import mongoose from 'mongoose';
import CONF from './conf.js';

export const connectDB = () => mongoose.connect(CONF.DB_URL, {})
