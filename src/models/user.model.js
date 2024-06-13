import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * User Schema definition for MongoDB using Mongoose.
 * This schema defines the structure of the User document and includes methods for authentication.
 */
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // URL from a cloud storage service like Cloudinary
        required: true,
    },
    coverImage: {
        type: String, // URL from a cloud storage service like Cloudinary
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true });

/**
 * Middleware to hash the user's password before saving it to the database.
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

/**
 * Method to compare a given password with the stored hashed password.
 * @param {string} password - The plain text password to compare.
 * @returns {Promise<boolean>} - Returns true if the password matches, false otherwise.
 */
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

/**
 * Method to generate an access token for the user.
 * @returns {string} - The generated JWT access token.
 */
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this.id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRAY
        }
    );
};

/**
 * Method to generate a refresh token for the user.
 * @returns {string} - The generated JWT refresh token.
 */
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this.id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRAY
        }
    );
};

export const User = mongoose.model('User', userSchema);
