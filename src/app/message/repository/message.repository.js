import {Message} from "../model/message.model.js";

export async function createMessage(content, receiver, sender) {
    return Message.create({
        content,
        sender,
        recipient: receiver,
    })
}

export async function getAllMessages(id) {
    return await Message.find({
            recipient: id,
        }, null
        , {populate: {path: "sender"}});
}