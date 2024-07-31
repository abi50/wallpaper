import * as userService from '../services/users.js';

// Create a new user
export const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user by ID
export const updateUserById = async (req, res) => {
    try {
        const user = await userService.updateUserById(req.params.id, req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
    try {
        const user = await userService.deleteUserById(req.params.id);
        if (user) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



















// import express from 'express'
// import usersModel from '../Model/usersModel'
// import mongoose from '../DB/mongoConect'

// async function addUser(req,res){
//     try{
//         const userData=extractUserData(req);
//         const user=await createUser(userData);
//         await saveUser(user);
//         res.messeage('user add successefully');
//         login(req,res);
//     }
//     catch(error){
//         handleError(error,res);
//     }
// }
// async function updateUser(req,res){
//     try{
//        const{ name,  id, profile,  password,  email}=req.body;
//        const updateUser= await findApdateUser(req.user._id,{ name,  id, profile,  password,  email})
//        if(!updateUser){
//         return handleUserNotFound(res)
//        }
//        await sendLoginResponse(req,res)
//     }
//     catch{
//         console.log("chach")
//         return handleUpdateUserError(error,res)
//     }
// }