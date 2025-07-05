import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, requiured:true},
    email: {type:String, required: true},
    password: {type:String, requiured:true},
    creditBalance:{type:Number, default:5},
})

const userModel =mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;