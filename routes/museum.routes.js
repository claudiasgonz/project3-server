import express from "express";
import isAuth from "../middleware/authentication.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";
import Museum from "../models/museum.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/", isAuth, isAdmin, async (req, res) => {
    try {
        const { name, location, image, description, artType, website } = req.body;
        const museumData = { 
            name, 
            location, 
            image, 
            description, 
            artType, 
            website 
        };
        for(const property in museumData) {
            if(!museumData[property]) {
                delete museumData.property;
            }
        }

        const museum = await Museum.create(museumData);

        res.status(201).json({ message: "Museum created succesfully", museum });


    } catch (error) {
       console.log("Error creating Museum item", error);
       res.status(500).json(error);
    }
});

// GET ALL MUSEUMS
router.get("/all", async (req, res) => {
    try {
        const allMuseums = await Museum.find().populate("reviews");

        res.json(allMuseums);
    } catch (error) {
        console.log("Error fetching all museums", error);
        res.status(500).json(error);
    }
});

// GET A SPECIFIC MUSEUM DETAILS BY ID
router.get("/:museumId", async (req, res) => {
    try {
        const { museumId } = req.params;

        const museum = await Museum.findById(museumId).populate("reviews");

        res.json(museum)
    } catch (error) {
        console.log("Error fetching single museum details", error);
    }
});

// UPDATE A SPECIFIC MUSEUM BY ID
router.put("/:museumId", isAuth, isAdmin, async (req, res) => {
    try {
        const { museumId } = req.params;
        const { name, location, image, description, artType, website } = req.body;
        const museumData = { 
            name, 
            location, 
            image, 
            description, 
            artType, 
            website 
        };
        for(const property in museumData) {
            if(!museumData[property]) {
                delete museumData.property;
            }
        }

        const updated = await Museum.findByIdAndUpdate(museumId, museumData, {
            new: true,
            runValidators: true,
        });

        res.json({ message: "Museum was updated succesfully", updated });
    } catch (error) {
        console.log("Error editing museum", error);
        res.status(500).json(error);
    }
});

// DELETE A MUSEUM 
router.delete("/:museumId", isAuth, isAdmin, async (req, res) => {
    try {
        const { museumId } = req.params;

        const museum = await Museum.findById(museumId).populate("reviews");

        for(const review of museum.reviews){
            await User.findByIdAndUpdate(review.creator, {
                $pull: { reviews: review._id },
            });
            await Review.findByIdAndDelete(review._id)
        }

        const deleted = await Museum.findByIdAndDelete(museumId);
        
        res.json({ message: deleted.name + " Museum was deleted succesfully", deleted 
        });
    } catch (error) {
        console.log("Error deleting the museum", error);
        res.status(500).json(error);
    }
});

export default router;