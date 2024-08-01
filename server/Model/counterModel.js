// models/counter.js
import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    entity: { type: String, required: true, unique: true },
    count: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counter', counterSchema);
export default Counter;
