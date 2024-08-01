// models/image.js
import mongoose from 'mongoose';
import { getNextSequenceValue } from '../utils/counter.js';

const imageSchema = new mongoose.Schema({
    url: String,
    userId: Number,
    likes: Number,
    downloadsCounter: Number,
    categories: [Number],
    id: { type: Number, unique: true }
});

imageSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.id = await getNextSequenceValue('images');
    }
    next();
});

const Image = mongoose.model('Image', imageSchema);
export default Image;
