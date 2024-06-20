import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    review: {
        type: String,
        required: true, 
        trim: true,
        maxLength: 500,
        minLength: 24
    },
    rating: {
        type: Number,
        required: true,
        enum: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5], 
    },
    museum: {
        type: Schema.Types.ObjectId, 
        ref: "Museum", 
        required: true 
    },
    creator: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    }
}, 
{
timestamps: true,
}
);

export default model("Review", reviewSchema);