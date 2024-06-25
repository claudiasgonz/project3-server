import express from 'express';
import Review from '../models/review.model.js';
import User from '../models/user.model.js';
import Museum from '../models/museum.model.js';
import isAuth from "../middleware/authentication.middleware.js";

const router = express.Router();

// CREATE REVIEW
router.post("/:museumId", isAuth, async (req, res) => {
   try {
    const {museumId} = req.params;
    const {title, review, rating} = req.body;

    const createdReview = await Review.create({
        title, 
        review, 
        rating, 
        creator: req.user._id, 
        museum: museumId,
    });
    await User.findByIdAndUpdate(
        req.user._id, 
        {$push: {reviews: createdReview._id}}, 
        {new: true}
    );
    await Museum.findByIdAndUpdate(
        museumId, 
        {$push: {reviews: createdReview._id}}, 
        {new: true}
    );

    res.status(201).json({ message: "Review created succesfully", createdReview });

   } catch (error) {
    console.log("Error while creating a review", error);
    res.status(500).json(error);
   } 
});

// DELETE REVIEW
router.delete("/:reviewId", isAuth, async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId);

        if(review.creator.toString() !== req.user._id) {
            return res
            .status(401)
            .json({ message: "You are not authorized to delete this review." });
        }

        await Museum.findByIdAndUpdate(review.museum, {
            $pull: { reviews: review._id },
        });
        await User.findByIdAndUpdate(review.creator, {
            $pull: { reviews: review._id },
        });

        await Review.findByIdAndDelete(reviewId);

        res.json({ message: "Your review was deleted succesfully" });
    } catch (error) {
        console.log("Error while deleting review", error);
        res.status(500).json(error);
    }
});

export default router;