import mongoose from 'mongoose';
import { getNextSequenceValue } from '../utils/counter.js';

const usersSchema = new mongoose.Schema({
    name: String,
    id: { type: Number, unique: true },
    profile: String,
    password: String,
    email: String,
    myImages: [Number],
    collections: [[String, Number]],
    favorites: [Number],
    isDeleted: { type: Boolean, default: false } // הוספת שדה סטטוס מחיקה
});

usersSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.id = await getNextSequenceValue('users');
    }
    next();
});

const User = mongoose.model('User', usersSchema);
export default User;
