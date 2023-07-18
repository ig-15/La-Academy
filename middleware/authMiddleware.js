import chalk from "chalk";
import jwt from "jsonwebtoken"
export const authenticate = (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:"Unauthorised"})
    }
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decodedToken.id
        next()

    } catch (error) {
        console.log(chalk.red("Authenticate middleware error"));
        console.error(error);
        return res.status(401).json({message:"Unauthorised"})
    }
}