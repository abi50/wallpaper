
# Wallpaper Project

This is a full-stack image upload and sharing platform that allows registered users to upload, view, download, and manage wallpapers. It includes user authentication, category filtering, and personal image collections.

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based login and registration
- **File Upload**: Multer middleware
- **Other Tools**: dotenv, bcrypt, uuid, cors

## 📁 Project Structure

```
wallpaperProject/
├── client/               # Frontend files
│   ├── css/              # CSS files
│   ├── js/               # JavaScript files
│   └── views/            # HTML pages
├── server/               # Backend server
│   ├── DB/               # MongoDB connection
│   ├── Model/            # Mongoose schemas
│   ├── controler/        # Route logic (controllers)
│   ├── middleware/       # Authentication middleware
│   ├── routes/           # Express routes
│   ├── services/         # Business logic
│   ├── utils/            # ID generator
│   └── app.js            # Main app entry point
```

## ✅ Features

- User registration and login
- JWT authentication
- Image upload and download
- Search by category
- Manage personal collections and favorites
- Admin-like category management
- Soft deletion of categories and images

## 🚀 How to Run

1. Clone the repository
2. Navigate to the `server` folder and run:

```bash
npm install
npm start
```

3. Open `client/views/site.html` in the browser to interact with the frontend

4. Make sure MongoDB is running locally, or update `.env` with your connection string.

## 📂 Environment Variables

Create a `.env` file in the `server` folder:

```
MONGO_URL=mongodb://localhost:27017/wallpaperDB
JWT_SECRET=your_secret_key
PORT=3000
```

---

Developed with ❤️ as a full-stack practice project.
