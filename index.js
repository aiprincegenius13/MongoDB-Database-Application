import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import mongoose from "mongoose";
import Movie from "./models/movie.js";
import "dotenv/config"

// --- App & Middleware Setup ---
const app = express();
const PORT = 8081;

// This middleware allows Express to parse JSON data in requests.
app.use(express.json());

// --- MongoDB Setup ---
// const uri = "mongodb+srv://ejblack369:1234@ejblack369.luk19.mongodb.net/?retryWrites=true&w=majority&appName=ejblack369";
// const client = new MongoClient(uri);
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB")
})


// Helper function to connect to your MongoDB and return the `sample_mflix` DB reference.
// async function connectDB() {
//   // If not connected, connect:
//   if (!client.topology || !client.topology.isConnected()) {
//     await client.connect();
//   }
//   return client.db("sample_mflix");
// }

// Optional: Predefined movies to insert.
// const newMovies = [
//   {
//     title: "The Great Omen of the Mana God",
//     writers: ["Jamar Johnson"],
//     directors: ["Jamar Johnson"],
//     plot: "A god thrown out of the heavens, once revered for his heroic deeds, turns to the darkness...",
//     fullplot: "Among the earliest existing films in American cinema...",
//     languages: ["English"],
//     released: new Date("1903-12-01T00:00:00.000Z"),
//     rated: "TV-G",
//     awards: {},
//     lastupdated: "2015-08-13 00:27:59.177000000",
//     year: 1903,
//     imdb: {},
//     countries: ["USA"],
//     type: "movie",
//     tomatoes: {},
//     num_mflix_comments: 0
//   },
//   {
//     title: "A Trip to a Fantasy Land",
//     writers: ["Jamar Johnson"],
//     directors: ["Jamar Johnson"],
//     plot: "Lost in a multiverse of worlds, Jack must traverse the multiverse to survive.",
//     fullplot: "A young boy finds a mysterious ring that allows him to travel between untold worlds...",
//     languages: ["French"],
//     released: new Date("1902-09-01T00:00:00.000Z"),
//     rated: "TV-G",
//     awards: {},
//     lastupdated: "2015-08-13 00:27:59.177000000",
//     year: 1902,
//     imdb: {},
//     countries: ["France"],
//     type: "movie",
//     tomatoes: {},
//     num_mflix_comments: 0
//   },
//   {
//     title: "Gunsmith of the Manaforged",
//     writers: ["Jamar Johnson"],
//     directors: ["Jamar Johnson"],
//     plot: "Born in a fantasy world with memories from his previous life...",
//     fullplot: "Peter, formerly known as Xavier in his past life, is reborn in a world filled with mana...",
//     languages: ["English"],
//     released: new Date("2024-01-01T00:00:00.000Z"),
//     rated: "TV-R",
//     awards: {},
//     lastupdated: "2015-08-13 00:27:59.177000000",
//     year: 2024,
//     imdb: {},
//     countries: ["USA"],
//     type: "movie",
//     tomatoes: {},
//     num_mflix_comments: 0
//   },
//   {
//     title: "The Kiss of the Mana Drain",
//     writers: ["Jamar Johnson"],
//     directors: ["Jamar Johnson"],
//     plot: "A forbidden love story that transcends time and magic.",
//     fullplot: "An ancient tale of power and betrayal, where a single kiss can drain the life force...",
//     languages: ["Aramaic"],
//     released: new Date("-4000-01-01T00:00:00.000Z"), // Handling ancient dates
//     rated: "TV-R",
//     awards: {},
//     lastupdated: "2015-08-13 00:27:59.177000000",
//     year: -4000, // Negative year to represent ancient times
//     imdb: {},
//     countries: ["Pangea"],
//     type: "movie",
//     tomatoes: {},
//     num_mflix_comments: 0
//   }
// ];

// --- Routes ---


app.get("/", async (req, res) => {
    res.send("GEt all the movies")
})

app.get("/movies", async (req, res) => {
   const movies = await Movie.find()
   res.json(
        movies
   )
})

app.post("/movies", async (req, res) => {
    const newMovie = new Movie(req.body)
    const movie = await newMovie.save()
    res.json(movie)
})

app.delete("/movies/:id", async (req, res) => {
    
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id)
    res.json(deletedMovie)
})

app.patch("/movies/:id", async (req, res) => {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body)
    res.json(updatedMovie)
 
})

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
