import { Schema, model } from "mongoose";

const museumEntrySchema = new Schema(
    {
    museumName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    visitDate: {
        type: Date,
    },
    notes: {
        type: String,
        trim: true,
        maxLength: 1000,
    },
    exhibitions: {
        type: String,
        trim: true,
        mmaxLength: 500,
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: "List",
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    },
    {
        timestamps: true,
    }
    );

    export default model("MuseumEntry", museumEntrySchema);