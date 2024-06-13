import mongoose, { Schema } from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new Schema({
    videoFile: {
        type: String, //Cloudnery
        required: [true, "Video is important"]
    },
    thumbnail: {
        type: String, //Cloudnery
        required: [true, "thumbnail is required"]
    },
    description: {
        type: String, //Cloudnery
        required: [true, "description is important"]
    },
    title: {
        type: String, //Cloudnery
        required: [true, "Title is required"]
    },
    duration: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)