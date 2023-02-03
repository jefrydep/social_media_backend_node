import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required:true,
            min:2,
            max:50,
        },
        lastName:{
            type: String,
            required:true,
            min:2,
            max:50,
        },
        email:{
            type: String,
            required:true,
            min:2,
            max:50,
        },
        password:{
            type: String,
            require:true,
            min:5,
           
        },
        picturePath:{
            type: String,
           default:"",
        },
        friends:{

            type: Array,
            default:[],
        },
        location:String,
        occupation:String,
        viewedProfile:Number,
        impressions:Number,
    },
    {
        timestamps:true //nos da las fechas autmaticamente cuando fueron creadas

    }
)
const User = mongoose.model("User",UserSchema);
export default User;