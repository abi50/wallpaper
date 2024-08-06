import mongoose from 'mongoose';
// import { getNextImageId } from '../utils/idGenerator.js';
import User from './usersModel.js';

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    userName: { type: String, required: true },
    likes: { type: Number, default: 0 },
    downloadsCounter: { type: Number, default: 0 },
    categories: [Number],
    imageId: { type: Number, unique: true, required: true },
    isDeleted: { type: Boolean, default: false }
});

imageSchema.pre('save', async function (next) {
    // if (this.isNew) {
    //     this.imageId = await getNextImageId();
    //     console.log('Generated Image ID:', this.imageId); // הדפסה
    // }
    const user = await User.findOne({ name: this.userName, isDeleted: false });
    if (!user) {
        throw new Error('User with the given userName does not exist.');
    }
    next();
});

const Image = mongoose.model('Image', imageSchema);
export default Image;