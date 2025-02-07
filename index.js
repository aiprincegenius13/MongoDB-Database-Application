import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import mongoose from "mongoose";
import Movie from "./models/movie.js";
import User from "./models/user.js";
import Review from "./models/reviews.js";
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

//=====Review Routes-------

app.get("/reviews", async (req, res) => {
    const reviews = await Review.find()
    res.json(
         reviews
    )
 })

 app.post("/reviews", async (req, res) => {
    const newReview = new Review(req.body)
    const reviews = await newReview.save()
    res.json(reviews)
})






//====User Routes----

app.get("/users", async (req, res) => {
    const users = await User.find()
    res.json(
         users
    )
 })

 app.post("/users", async (req, res) => {
    const newUser = new User(req.body)
    const user = await newUser.save()
    res.json(user)
})


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
