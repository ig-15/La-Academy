import chalk from "chalk";
import mongoose from "mongoose";
const connectDatabase = async () =>{
    try {
        await mongoose.connect(process.env.DATABASE_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            autoIndex:true,
            // minPoolSize:200,
            // maxPoolSize:5000
        })
        console.log(chalk.green("Database Connected Succeccfully"));
    } catch (error) {
        console.log(chalk.red("Database connection Error"));
        console.log(error);
    }
}

export default connectDatabase;