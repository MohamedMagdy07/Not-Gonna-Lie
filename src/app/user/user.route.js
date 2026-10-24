import {Router} from 'express';
import {withCache} from "../../lib/cache/withCache.js";
import {getALlUsers} from "./controller/user.controller.js";

export const userRouter = Router()

userRouter.get('/getAllUsers', withCache(300), getALlUsers);
