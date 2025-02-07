import mongoose from "mongoose"

const reviewSchema= new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
  
})
   
   const Review = mongoose.model("Review", reviewSchema)

   export default Review