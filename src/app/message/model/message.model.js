import {Schema,model} from "mongoose";


const messageSchema = new Schema({
        content: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 500,
            trim: true
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    })


export const Message = model("Message", messageSchema);