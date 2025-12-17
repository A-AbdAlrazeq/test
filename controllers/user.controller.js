import { userService } from "../services/factory.js";
import UserDto from "../dto/user.dto.js";

export const getUsers = async (req,res) => {
    try{
        const users = await userService.findAll();
        const dtoUsers = UserDto.fromModels(users);
        res.json(dtoUsers); 
      }
 catch(err){
res.status(500).json({message :err.message});
}
};

export const createUser =async (req,res)=>{
    try{
        // validate incoming payload against DTO schema (without id/timestamps)
        const parsed = UserDto.schema.pick({ name: true, email: true }).parse(req.body);
        const user = await userService.create(parsed);
        const dto = UserDto.fromModel(user);
        res.status(201).json(dto);
        }catch (err){
            if (err.name === 'ZodError') {
                return res.status(400).json({ errors: err.errors });
            }
            res.status(500).json({message:err.message});
        }
}
export default {getUsers,createUser};