// import express from "express";
// import { connectDB } from "../server.js";

// const router = express.Router();

// // Update specific fields in a movie (PATCH)
// router.patch("/movies/:title", async (req, res) => {
//     const { title } = req.params;
//     const updates = req.body;
//     const db = await connectDB();

//     try {
//         const result = await db.collection("movies").updateOne(
//             { title },
//             { $set: updates }
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).json({ message: "Movie not found" });
//         }

//         res.json({ message: "Movie updated successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to update movie" });
//     }
// });

// // Replace entire movie document (PUT)
// router.put("/movies/:title", async (req, res) => {
//     const { title } = req.params;
//     const newMovieData = req.body;
//     const db = await connectDB();

//     try {
//         const result = await db.collection("movies").replaceOne(
//             { title },
//             newMovieData
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).json({ message: "Movie not found" });
//         }

//         res.json({ message: "Movie replaced successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to replace movie" });
//     }
// });

// export default router;

import express from "express";
import { connectDB } from "../index.js";
import { MongoClient } from "mongodb";

const router = express.Router();

// insert 4 new movies with complete details
router.put("/movies/update-new", async (req, res) => {
    const db = await connectDB();
    
    try {
        const newMovies = [
            {
                title: "The Great Omen of the mana god",
                writers: ["Jamar Johnson"],
                directors: ["Jamar Johnson"],
                plot: "AA god thrown out of the heavens, once reveered for his hroic deeds, turns to the darkness to get revenge on his brethen",
                fullplot: "Among the earliest existing films in American cinema - notable as the first narrative Western...",
                languages: ["English"],
                released: new Date("1903-12-01T00:00:00.000Z"),
                rated: "TV-G",
                awards: {},
                lastupdated: "2015-08-13 00:27:59.177000000",
                year: 1903,
                imdb: {},
                countries: ["USA"],
                type: "movie",
                tomatoes: {},
                num_mflix_comments: 0
            },
            {
                title: "A Trip to a fantasy land",
                writers: ["Jamar Johnson"],
                directors: ["Jamar Johnson"],
                plot: "Lost in a multiverse of worlds, Jack must traverse the multiverse to survive, ",
                fullplot: "A young boy living on the street, finds a mysterious ring, that allows him to travel to untold worlds simply by going through a doorway, lost in the multiverse, he must find a way back to his own world, or learn to live lost in the multiverse ",
                languages: ["French"],
                released: new Date("1902-09-01T00:00:00.000Z"),
                rated: "TV-G",
                awards: {},
                lastupdated: "2015-08-13 00:27:59.177000000",
                year: 1902,
                imdb: {},
                countries: ["France"],
                type: "movie",
                tomatoes: {},
                num_mflix_comments: 0
            },
            {
                title: "Gunsmith of the manaforged",
                writers: ["Jamar Johnson"],
                directors: ["Jamar Johnson"],
                plot: "Born in a new world of fanstasy with his memories from his previous life, Peter finds that his previous life knowlege creating firearms is highly useful and one of a kind ina world without guns",
                fullplot: "Peter formerly known as Xavier in his previous life, is born in a world full of man, but little technology.  Peter ultimately finds that he is able to create firearms that utilize mana, and and in doing so ushers in the new age of technology, death and mayham in a world of wizardy, and monsters.",
                languages: ["English"],
                released: new Date("1903-01-01T00:00:00.000Z"),
                rated: "TV-R",
                awards: {},
                lastupdated: "2015-08-13 00:27:59.177000000",
                year: 2024,
                imdb: {},
                countries: ["USA"],
                type: "movie",
                tomatoes: {},
                num_mflix_comments: 0
            },
            {
                title: "The Kiss of the mana drain",
                writers: ["Jamar Johnson"],
                directors: ["Jamar Johnson"],
                plot: "",
                fullplot: "",
                languages: ["Aramaic"],
                released: new Date("1896-01-01T00:00:00.000Z"),
                rated: "TV-R",
                awards: {},
                lastupdated: "2015-08-13 00:27:59.177000000",
                year: "4000BC",
                imdb: {},
                countries: ["Pangea"],
                type: "movie",
                tomatoes: {},
                num_mflix_comments: 0
            }
        ];

        let updates = [];

        for (const movie of newMovies) {
            const result = await db.collection("movies").insertMany(
                { title: movie.title }, // Search by title
                movie, // add movie with full new document
                { upsert: true } // Insert if not exists
            );

            updates.push({
                title: movie.title,
                matched: result.matchedCount,
                modified: result.modifiedCount,
                upsertedId: result.upsertedId || null
            });
        }

        res.json({
            message: "4 new movies added or updated successfully",
            updates
        });

    } catch (error) {
        console.error("Error updating movies:", error);
        res.status(500).json({ error: "Failed to update movies" });
    }
});

export default router;


