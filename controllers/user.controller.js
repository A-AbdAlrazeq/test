import { userService } from "../services/factory.js";
import UserDto from "../dto/user.dto.js";
import { logger } from "../middleware/Logging.js";

export const getUsers = async (req,res) => {
    try{
        logger.info('Getting all users');
        
        const users = await userService.findAll();
        const dtoUsers = UserDto.fromModels(users);
        logger.info('Users retrieved successfully', { count: dtoUsers.length });
        res.json(dtoUsers); 
      }
 catch(err){
    logger.error('Error getting users', { error: err.message });
    res.status(500).json({message :err.message});
}
};

export const createUser = async (req,res)=>{
    try{
        logger.info('Creating new user', { body: req.body });
        
        // validate incoming payload against DTO schema (without id/timestamps)
        const parsed = UserDto.schema.pick({ name: true, email: true }).parse(req.body);
        const user = await userService.create(parsed);
        const dto = UserDto.fromModel(user);
        logger.info('User created successfully', { userId: user.id });
        res.status(201).json(dto);
        }catch (err){
            logger.error('Error creating user', { error: err.message });
            if (err.name === 'ZodError') {
                return res.status(400).json({ errors: err.errors });
            }
            res.status(500).json({message:err.message});
        }
}
export default {getUsers,createUser};