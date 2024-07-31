import mongoose from "mongoose";

//מקבלת פרטים שמשתמש הכניס ומחזירה משתמש מלא
function extractUserData(req){
    const { name,id,profile, password,email}=req.body
    return{
        name,
        id,
        profile,
        password, 
        email,
        myImages: [],
        colections: [],
        favorites: []
    }
}
//מקבלת פרטים של יוזר ומחזירה מודל של יוזר
async function creatUser(userData){
    return new userModel(userData);
}

async function saveUser(user){
    await user.save();
}