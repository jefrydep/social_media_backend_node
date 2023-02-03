import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import User from "../models/User.js"

// register user
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        const newUser = new User({
            password:passwordHash,
            firstName,
            lastName,
            email,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random()*1000),
            impressions:Math.floor(Math.random()*1000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(
            {error:err.message}
        );


    }
}

export const login = async(req,res)=>{
    try {
        const {email,password}= req.body;
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).json({msg: " user does not exist."});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)return res.status(400).json({msg:'Invalid credentials'})
        const token = Jwt.sign({id: user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user});
    } catch (err) {
        res.status(500).json({error:err.message});
        
    }
}