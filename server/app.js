import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import users from '../server/routes/users.js';  // ייבוא המודול
import images from '../server/routes/images.js';  // ייבוא המודול
import { connectToDB } from './DB/mongoConect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
const port = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")))
images(app);
users(app);
connectToDB();
// app.use("/images",images);
// app.use("/users",users);

app.listen(port, () => {
    console.log(`Example app listening on port1 ${port}`)
  });
