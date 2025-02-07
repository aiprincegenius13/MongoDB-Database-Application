import mongoose from "mongoose"

const movieSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
})
   
   const Movie = mongoose.model("Movie", movieSchema)

   export default Movie