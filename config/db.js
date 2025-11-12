import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb';

export async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected -> ${MONGODB_URI}`);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open');
});
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose disconnected');
});