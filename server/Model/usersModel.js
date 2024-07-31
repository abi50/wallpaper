import mongoose from 'mongoose'
const usersSchema=new mongoose.Schema({
    name:String,
    id:Number,
    profile:String,
    password:String, 
    email:String,
    myImages:[Number],
    colections:[String][Number],
    favorites:[Number]
})
const userModel=mongoose.model("users",usersSchema)
export default userModel;