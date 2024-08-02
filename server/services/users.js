
import User from '../Model/usersModel.js';

// Create a new user
export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// Get a user by ID
export const getUserById = async (id) => {
    return await User.findById(id);
};

// Update a user by ID
export const updateUserById = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
};

// Delete a user by ID
export const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};

export const getUserCollections = async (id) => {
    const user = await User.findOne({ id });
    if (!user) throw new Error('User not found');
    return user.collections;
};