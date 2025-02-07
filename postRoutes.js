import express from "express";
import { connectDB } from "../index.js";

const router = express.Router();

// Add a new movie
router.post("/movies", async (req, res) => {
    const db = await connectDB();
    const newMovie = req.body;

    try {
        const result = await db.collection("movies").insertOne(newMovie);
        res.status(201).json({ message: "Movie added", id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: "Failed to add movie" });
    }
});

export default router;
