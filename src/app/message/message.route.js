import * as messageContorller from "./controller/message.controller.js"
import {Router} from "express";

export const messageRouter = Router();

messageRouter.post("/", messageContorller.sendMessage);
