// getting-started.js
import mongoose from 'mongoose';



// export async function connectToDB() {
//   try {
//     console.log("got in");
//     await mongoose.connect('mongodb://127.0.0.1:27017/wallpapere');
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("Failed to connectbhjbj,b to MongoDB", err);
//   }
// }

export async function connectToDB() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect('mongodb://127.0.0.1:27017/wallpapere', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}