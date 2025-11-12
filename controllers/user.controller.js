import User from "../models/user.model.js";
export const getUsers = async (req,res) => {
    try{
        const users= await User.find();
        res.json(users); 
      }
 catch(err){
res.status(500).json({message :err.message});
}
};

export const createUser =async (req,res)=>{
    try{
        const user= await User.create(req.body);
        res.status(201).json(user);
        }catch (err){
            res.status(500).json({message:err.message});
        }
}
export default {getUsers,createUser};