import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    url: String,
    userId: Number,
    likes: Number,
    downloadsCounter: Number,
    categories: [Number]
});

const Image = mongoose.model('Image', imageSchema);

export default Image;