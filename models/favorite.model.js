import { Schema, model } from "mongoose";

const favoriteSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        museumId: {
            type: Schema.Types.ObjectId,
            ref: "Museum",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model("Favorite", favoriteSchema);