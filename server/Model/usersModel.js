import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    userId: { type: Number, unique: true },
    profile: { type: String},
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    myImages: [Number],
    collections: [{
        type: { type: String, required: true }, // מחרוזת המייצגת את שם האוסף
        items: [Number] // מערך של מספרים
    }],
    favorites: [Number],
    isDeleted: { type: Boolean, default: false }
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        // Hash the password before saving
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
