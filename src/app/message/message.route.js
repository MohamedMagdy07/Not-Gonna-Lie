import * as messageContorller from "./controller/message.controller.js"
import {Router} from "express";
import {guard} from "../../lib/auth/guard.js";

export const messageRouter = Router();

messageRouter.post("/", messageContorller.sendMessage)

messageRouter.post("/public",guard, messageContorller.sendMessage)

