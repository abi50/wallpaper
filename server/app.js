import express from 'express';
import userRoutes from './routes/users.js';
import imageRoutes from './routes/images.js';
import { connectToDB } from './DB/mongoConect.js';

const app = express();
app.use(express.json());

// Database connection
connectToDB();

// Routes
app.use('/users', userRoutes);
app.use('/images', imageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
