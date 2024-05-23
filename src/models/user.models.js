import mongoose ,{schema} from "mongoose"

import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"

const userSchema = new schema({
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
            type: schema.types.ObjectId,
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
    if(!this.ismodified("password")) return next();
    this.bcrypt = bcrypt.hash(this.password,10)
    next()

});

userSchema.methods.ispasswordConnect = async function (password){
    return await bcrypt.compare(password , this.password);

};

export const User = mongoose.model("User",userSchema)