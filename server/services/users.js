
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

// import mongoose from "mongoose";

// //מקבלת פרטים שמשתמש הכניס ומחזירה משתמש מלא
// function extractUserData(req){
//     const { name,id,profile, password,email}=req.body
//     return{
//         name,
//         id,
//         profile,
//         password, 
//         email,
//         myImages: [],
//         colections: [],
//         favorites: []
//     }
// }
// //מקבלת פרטים של יוזר ומחזירה מודל של יוזר
// async function creatUser(userData){
//     return new userModel(userData);
// }

// async function saveUser(user){
//     await user.save();
// }
