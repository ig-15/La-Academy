import express from "express";
import dotenv from "dotenv"
import morgan from "morgan";
import accountRouter from "./routes/account.js";
import classRouter from "./routes/class.js";
import connectDatabase from "./config/db.js";
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerDoc from "./config/swagger.js" 
import cookieParser from "cookie-parser";
import chalk from "chalk";
import authRouter from "./routes/auth.js";
const swaggerSpec = swaggerJSDoc(swaggerDoc)
dotenv.config()
const app = express()
connectDatabase();
app.use(express.json())
// if(process.env.NODE_ENV === "development"){
//     console.log("Dev mode");
//     app.use(morgan("tiny"))
// }else{
//     console.log("Production");
//     app.use(morgan("short"))
// }
app.use(morgan("tiny"))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/account",accountRouter)
app.use("/api/class",classRouter)
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec,{explorer:true}))
app.listen(process.env.PORT,()=>{
    console.log(chalk.yellow(`Server started on port ${process.env.PORT} \nhttp://localhost:${process.env.PORT}`))
})
