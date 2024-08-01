// models/user.js
import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    name: String,
    id: { type: Number, required: true, unique: true },
    profile: String,
    password: String,
    email: String,
    myImages: [Number],
    colections: [[String, Number]],
    favorites: [Number]
});

const User = mongoose.model('User', usersSchema);
export default User;