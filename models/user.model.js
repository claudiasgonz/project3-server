import { Schema, model } from "mongoose";

const userSchema = newSchema({
    username: { 
        type: String, 
        unique: true, 
        required: true, 
        maxLength: 40, 
        minLength: 5, 
        trim: true, 
        },
    email: { 
        type: String,
        unique: true, 
        required: true, 
        maxLength: 50, 
        trim: true,
        },
    password: {
        type: String,
        required: true, 
        minLength: 8
        },
    profilePic: {
        type: String, 
        default: "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
        },
    reviews: [{
        type: Schema.Types.ObjectId, 
        ref: "Review"
        }],
    isAdmin: { 
        type: Boolean, 
        default: false,
        },
}, 
{
    timestamps: true
}
);

export default model("User", userSchema);