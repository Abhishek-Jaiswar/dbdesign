import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinery.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from frontend
    // Validation - not empty
    // check if user already exist: through username, email
    // check for images, check for avtar,
    // upload them to cloudinery, avtar
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response 

    const { username, fullName, email, password } = req.body
    if (
        [fullName, email, password, username].some((feild) =>
            feild?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All feilds are required!")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exist")
    }

    const avtarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLoaclPath = req.files?.coverImage[0].path;

    if (!avtarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avtarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLoaclPath)

    if (!avatar) {
        throw new ApiError("Avtar file is required!")
    }

    const createUser = await User.create({
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,

    })

    const createdUser = await User.findById(createUser._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registring user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfuly!")
    )
})

export { registerUser }