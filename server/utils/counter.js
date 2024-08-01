// utils/counter.js
import Counter from '../Model/counterModel.js';

export const getNextSequenceValue = async (entity) => {
    const counter = await Counter.findOneAndUpdate(
        { entity },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
    );
    return counter.count;
};
