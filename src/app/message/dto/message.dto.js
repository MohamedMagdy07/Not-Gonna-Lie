import {z} from "zod"
import {Types} from "mongoose";

export const sendMessageDto = z.object({
    receiver:z.string().trim().refine((val)=>{
        return Types.ObjectId.isValid(val);
    }),
    content:z.string().trim().min(2).max(150),
});
