import dotenv from "dotenv"
import connectdb from "./db/index.js"
import {app} from "./app.js"

dotenv.config({
    path: './env'
})

connectdb().then(()=>{
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`port is listen at ${process.env.PORT}`)
    })
})
.catch((error)=>{
console.log("db connection is failed : ", error)
})

