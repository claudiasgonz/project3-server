import express from 'express';
import isAuth from '../middleware/authentication.middleware.js';
import List from '../models/list.model.js';
import MuseumEntry from '../models/museumEntry.model.js';

const router = express.Router();

// CREATE A MUSEUM ENTRY
router.post("/:listId", isAuth, async (req, res) => {
    try {
     const { listId } = req.params;
     const { museumName, location, visitDate, notes, exhibitions } = req.body;

     const createdMuseumEntry = await MuseumEntry.create({
         museumName, 
         location, 
         visitDate,
         notes,
         exhibitions,
         list: listId,
         creator: req.user._id, 
     });

     const list = await List.findById(listId);
     if (!list) {
        return res.status(404).json({ message: "List not found" });
    }
 
     res.status(201).json({ message: "Museum entry created succesfully", createdMuseumEntry });
 
    } catch (error) {
     console.log("Error while creating a museum entry", error);
     res.status(500).json(error);
    } 
 });

 // UPDATE A SPECIFIC MUSEUM ENTRY BY ID
 router.put("/:entryId", isAuth, async (req, res) => {
    try {
        const { entryId } = req.params;
        const { museumName, location, visitDate, notes, exhibitions } = req.body;

        const museumEntryData = { 
            museumName,
            location,
            visitDate,
            notes,
            exhibitions
        };

        for(const property in museumEntryData) {
            if(!museumEntryData[property]) {
                delete museumEntryData.property;
            }
        }

        const updated = await MuseumEntry.findByIdAndUpdate(entryId, museumEntryData, {
            new: true,
            runValidators: true,
        });

        res.json({ message: "Museum entry was updated succesfully", updated });
    } catch (error) {
        console.log("Error editing museum entry", error);
        res.status(500).json(error);
    }
});

// DELETING A MUSEUM ENTRY
router.delete("/:entryId", isAuth, async (req, res) => {
    try {
        const { entryIdId } = req.params;

        const entry = await MuseumEntry.findById(entryId);

        if(!entry) {
            return res.status(404).json({ message: "Museum entry not found" });
        }

        if (entry.creator.toString() !== req.user._id) {
            return res.status(401).json({ message: "You are not authorized to delete this entry" });
        }

        for(const review of museum.reviews){
            await User.findByIdAndUpdate(review.creator, {
                $pull: { reviews: review._id },
            });
            await Review.findByIdAndDelete(review._id)
        }

        await MuseumEntry.findByIdAndDelete(entryId);

        res.json({ message: "Museum entry deleted successfully" });
    } catch (error) {
        console.log("Error deleting museum entry", error);
        res.status(500).json(error);
    }
});

export default router;