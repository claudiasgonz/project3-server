import { Schema, model } from "mongoose";

const listSchema = new Schema(
    {
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        unique: true,
    },
    description: {
        type: String, 
        trim: true,
        maxLength: 500,
    },
    museum: [
    {
        type: Schema.Types.ObjectId, 
        ref: "Museum",  
    },
],
    creator: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    }
}, 
{
timestamps: true,
}
);

export default model("List", listSchema);