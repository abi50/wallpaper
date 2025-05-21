
# Wallpaper Project 

Full-stack web application for uploading, viewing, and downloading wallpapers. Designed for registered users to manage personal image collections, search by categories, and interact with images.

---

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT, bcrypt
- **File Upload**: Multer
- **Other Tools**: dotenv, uuid, CORS, nodemon

---

##  Features

-  User registration and login with hashed passwords
-  JWT-based authentication and protected routes
-  Upload wallpapers with category selection
-  View all images, filter by categories
-  Download, like, favorite, and add images to collections
-  Soft delete logic for categories and images
-  Admin-level category creation (via code)

---

##  Project Structure

```
wallpaperProject/
├── client/               # HTML, CSS, JS files
│   ├── css/
│   ├── js/
│   └── views/
├── server/
│   ├── DB/               # MongoDB connection
│   ├── Model/            # Mongoose schemas
│   ├── controller/       # Controllers (logic)
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── middleware/       # Auth middleware
│   ├── utils/            # ID generators
│   ├── .env              # Local secrets (not committed)
│   └── app.js            # Entry point
```

---

##  Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/abi50/wallpaper.git
```

2. Navigate to the server folder:
```bash
cd wallpaperProject/server
npm install
```

3. Create a `.env` file in the `server` directory with the following content:

```
MONGO_URL=mongodb://localhost:27017/wallpaperDB
JWT_SECRET=your_secret_key
PORT=3000
```

4. Run the backend:
```bash
npm start
```

5. Open `client/views/site.html` in your browser to view the UI.

---

## Future Improvements

- [ ] Add tests (unit/integration)
- [ ] Deploy live demo using Render or Vercel
- [ ] Switch frontend to React or another modern framework
- [ ] Responsive design for mobile

---


##  Author

Developed by Abigail Berk - a junior full-stack developer as a personal project to practice clean architecture, authentication, file uploads, and database integration.
