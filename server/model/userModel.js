import mongoose from "mongoose";

const userSchema= new mongoose.Schema({

    email :{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require: true
    }
    
})


export default mongoose.model("users",userSchema);