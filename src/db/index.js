import mongoose from "mongoose"

import {db_name} from "../constant.js";

const connectdb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
        console.log(`\n mongodb connect !!! DB host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("mongodb connection is failed",error);
        process.exit(1);
    }
}

export default connectdb;