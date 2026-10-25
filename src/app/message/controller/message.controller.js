import * as messageService from '../service/message.service.js';
import {validationBody} from "../../../lib/validation/validation.js";
import { sendMessageDto} from "../dto/message.dto.js";

export async function sendMessage(req, res,next) {
    try{

        const data = validationBody(sendMessageDto,req.body);
        const sender = req.user?.id;

        const message = await messageService.sendMessage(data.content,data.receiver,sender)
        res.status(201).json({
            message:"message created successfully",
            status:"success",
            data:message,
        })
    }catch (err){
        next(err);
    }
}


export async function getAllMessages(req,res,next){
    try {

        const messages = await messageService.getALlMessages(req.user.id)
        res.json({
            messages:"we got all messages",
            status:"success",
            data:messages,
        })
    }catch(err){
        next(err);
    }
}