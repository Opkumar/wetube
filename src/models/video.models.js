import mongoose,{schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new schema({
    videoFile: {
        type: String, // connect url
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    view:{
        type: Number,
        default: 0
    },
    isPublished:{
        type: Boolean,
        default: true
    },
    owner:{
        type: schema.types.ObjectId,
        ref: "User"
    }


},
{
    timestamps: true
})

videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model("Video",videoSchema)