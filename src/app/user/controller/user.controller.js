import * as userService from "../service/user.service.js";

export async function getALlUsers(req,res,next){
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }catch(err){
        next(err);
    }
}