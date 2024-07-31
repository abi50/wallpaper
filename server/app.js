import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/users.js';  // עדכון לנתיב הנכון
import imageRoutes from './routes/images.js';  // עדכון לנתיב הנכון
// import { connectToDB } from './DB/mongoConect.js';  // עדכון לנתיב הנכון
import { connectToDB } from './DB/mongoConect.js';


// קביעת נתיבים עבור __filename ו- __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// חיבור למסד הנתונים
connectToDB();  // נניח שהפונקציה connectToDB עושה את החיבור למסד הנתונים

// הגדרת הנתיבים
app.use('/users', userRoutes);
app.use('/images', imageRoutes);

// הגדרת תיקיית סטטיות אם יש צורך (לא חובה)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
