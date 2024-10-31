import mongoose from 'mongoose';
import CONF from './conf.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const connectDB = async () => {
    if (CONF.DB_URL==='~') {
        const mongoMemory = await MongoMemoryServer.create();
        console.log('Using mongodb in memory')
        await mongoose.connect( mongoMemory.getUri(), {})
    } else {
        await mongoose.connect(CONF.DB_URL, {})
    }
    console.log('Connected to mongodb')
}
