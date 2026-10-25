import {findUserById} from "../../user/repository/user.repository.js";
import {userNotExists} from "../../user/error.js";
import * as messageRepo from "../repository/message.repository.js";

export async function sendMessage(content, receiver,sender) {
    const user = await findUserById(receiver);
    if(!user){throw userNotExists}
    return await messageRepo.createMessage(content, receiver, sender);
}