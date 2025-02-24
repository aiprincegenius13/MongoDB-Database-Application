import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
  
})
   
   const User = mongoose.model("User", userSchema)

   export default User