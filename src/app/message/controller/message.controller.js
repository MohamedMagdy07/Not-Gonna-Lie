import * as messageService from '../service/message.service.js';
import {validationBody} from "../../../lib/validation/validation.js";
import {sendMessageDto} from "../dto/message.dto.js";

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