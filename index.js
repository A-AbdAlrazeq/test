import express from 'express';
import dotenv from 'dotenv';
//import { connectDB } from './config/db.js';
import { connectDB } from './config/postgresDb.js';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});