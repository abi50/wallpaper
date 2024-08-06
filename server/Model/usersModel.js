import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    userId: { type: Number, unique: true, required: true },
    profile: String,
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    myImages: { type: [Number], default: [] },
    collections: { type: [[String, Number]], default: [] },
    favorites: { type: [Number], default: [] },
    isDeleted: { type: Boolean, default: false }
});

// נסה להוסיף את השורה הזו כדי לוודא שהאינדקס נוצר במידה והוא לא קיים
userSchema.index({ userId: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
export default User;