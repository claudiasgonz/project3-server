import { Schema, model } from "mongoose";

const museumSchema = new Schema(
    {
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://media.istockphoto.com/id/925251290/vector/museum-court-bank-icon.jpg?s=612x612&w=0&k=20&c=GuVRLuctg9MobJbAXx1tZqUUrUxSz_slV-bWskvl46A=",
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    artType: {
        type: String,
        required: true,
        // enum: [
        //     "Contemporary",
        //     "Modern",
        //     "Renaissance",
        //     "Baroque",
        //     "Classical",
        //     "Romanticism",
        //     "Impressionism",
        //     "Post-Impressionism",
        //     "Cubism",
        //     "Surrealism",
        //     "Abstract",
        //     "Pop Art",
        //     "Minimalism",
        //     "Street Art",
        //     "Digital Art",
        //     "Photography",
        //     "Sculpture",
        //     "Installations",
        //     "Performance Art",
        //     "Folk Art",
        //     "Outsider Art",
        //     "Art Nouveau",
        //     "Art Deco",
        //     "Futurism",
        //     "Expressionism",
        //     "Dada",
        //     "Conceptual Art",
        //     "Op Art",
        //     "Neo-Expressionism",
        //     "Video Art",
        //     "Graffiti",
        //     "Textile Art",
        //     "Ceramics",
        //     "Printmaking",
        //     "Land Art",
        //     "Body Art"
        // ],
    },
    website: {
        type: String,
        required: true,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Favorite",
    }],
}, 
{
    timestamps: true,
}
);
export default model("Museum", museumSchema);