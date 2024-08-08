import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { connectToDB } from './DB/mongoConect.js';
import userRoutes from './routes/users.js';
import imageRoutes from './routes/images.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import { env } from 'process';
const app = express();
app.use(express.json()); 
// Load environment variables
dotenv.config();
app.use(cors());

// Obtain the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
connectToDB();

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Serve static files (e.g., HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, '../client')));

// Define routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/images', imageRoutes);

// Test route to verify the server is working
app.get('/', (req, res) => {
    res.send( process.env.MANAGER_PASSWORD);
});

// app.post('/register', (req, res) => {
//     const { username, email, password } = req.body;
//     res.send(`User registered: ${username}, ${email}`);
// });


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
