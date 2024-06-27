import express from "express";
import isAuth from "../middleware/authentication.middleware.js";
import List from "../models/list.model.js";

const router = express.Router();

// CREATE A NEW LIST
router.post("/", isAuth, async (req, res) => {
    try {
        const { name, description } = req.body;

        const newList = await List.create({
            name,
            description,
            creator: req.user._id,
        });
        await User.findByIdAndUpdate(
            req.user._id, 
            {$push: {lists: createdList._id}}, 
            {new: true}
        );

        res.status(201).json({ message: "List created succesfully", createdList });
    } catch (error) {
        console.log("Error creating list", error);
        res.status(500).json(error);
    }
});

// GET ALL LISTS
router.get("/all", isAuth, async (req, res) => {
    try {
      const allLists = await List.find({ creator: req.user._id }).populate("museums");
  
      res.json(allLists);
    } catch (error) {
      console.log("Error fetching lists", error);
      res.status(500).json(error);
    }
  });

// GET A SPECIFIC LIST BY ID
router.get("/:listId", isAuth, async (req, res) => {
    try {
        const { listId } = req.params;

        const list = await List.findById(listId).populate("museums");

        if (!list) {
            return res.status(404).json({ message: "List not found" });
          }
        res.json(list);
    } catch (error) {
        console.log("error fetching single list details", error);
        res.status(500).json(error);
    }
});

// DELETE A LIST
router.delete("/:listId", isAuth, async (req, res) => {
    try {
        const { listId } = req.params;

        const list = await List.findById(listId).populate("museums");

        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }

        if (list.creator.toString() !== req.user._id) {
            return res.status(401).json({ message: "You are not authorized to delete this list" });
        }

        for (const museumEntry of list.museums) {
            await MuseumEntry.findByIdAndDelete(museumEntry._id);
        }

        const deletedList = await List.findByIdAndDelete(listId);

        res.json({ message: `${deletedList.name} list was deleted successfully`, deletedList });
    } catch (error) {
        console.log("Error deleting the list", error);
        res.status(500).json(error);
    }
});

export default router;
