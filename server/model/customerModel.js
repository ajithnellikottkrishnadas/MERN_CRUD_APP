import mongoose from "mongoose";

const customerSchema= new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
     phone:{
        type:String,
        required:true
    },
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    }
    
},{ timestamps: true })


export default mongoose.model("Customer",customerSchema);