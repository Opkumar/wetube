import mongoose,{Schema} from "mongoose"

import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
       
    },
    fullName: {
        type: String,
        required: true
        
    },
    avatar: {
        type: String, //connect url
        required: true
       
    },
    coverImage: {
        type: String,  // connet url 
        
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
    ],
    password: {
        type: String,
        required: [true,'password is require']

    },
    refreshTocken:{
        type: String

    }
},
{timestamps: true}
);

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.bcrypt = await bcrypt.hash(this.password,10)
    next()

});

userSchema.methods.ispasswordConnect = async function (password){
    return await bcrypt.compare(password , this.password);

};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName

    },
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})
};
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
        
    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
}
)
};

export const User = mongoose.model("User",userSchema)