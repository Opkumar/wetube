import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User}  from "../models/user.models.js"
import {uploadoncloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"



const registerUser = asyncHandler(async (req,res)=>{
    

const {fullName,email,userName,password} = req.body
// console.log("email : " , email)

if (
    [fullName,userName,password,email].some((field)=>
field?.trim()=="")
) {
    throw new ApiError(400,"All fields are required")
}

const existedUser = await User.findOne({
    $or: [{email},{userName}]
})
 if (existedUser) {
    throw new ApiError(409, "Id is already existed")
 }

 const avatarLocalPath = req.files?.avatar[0]?.path
//  const coverImageLocalPath = req.files?.coverImage[0]?.path

let coverImageLocalPath;
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
    
}

 if (!avatarLocalPath) {
    throw new ApiError(400,"avatar file is required")
 }

 const avatar = await uploadoncloudinary(avatarLocalPath)
 const coverImage = await uploadoncloudinary(coverImageLocalPath)

 if (!avatar) {
    throw new ApiError(400,"Avatar file is required")
    
 }

const user = await User.create(
    {
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        userName: userName.toLowerCase(),
        password
    }
 )

 const createdUser = await User.findById(user._id).select(
    "-password -refreshTocken"
 )
 

 if (!createdUser) {
    throw new ApiError(500,"something is wrong while registering the user")
 }

 return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
 )





})

export {registerUser}

