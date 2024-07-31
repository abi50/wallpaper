import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    id: Number,
    profile: String,
    password: String,
    email: String,
    myImages: [Number],
    collections: [[String, Number]],
    favorites: [Number]
});

const User = mongoose.model('User', userSchema);

export default User;