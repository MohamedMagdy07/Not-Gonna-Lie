import {findUserById} from "../../user/repository/user.repository.js";
import {userNotExists} from "../../user/error.js";
import * as messageRepo from "../repository/message.repository.js";
import {AppError} from "../../../pkg/error/error.js";

export async function sendMessage(content, receiver,sender) {
    const user = await findUserById(receiver);
    if(!user){throw userNotExists}
    return await messageRepo.createMessage(content, receiver, sender);
}


export async function getALlMessages(userId) {
    const messages = await messageRepo.getAllMessages(userId);
    if(messages.length ===0) throw new AppError("No messages",404);
    return messages;
}