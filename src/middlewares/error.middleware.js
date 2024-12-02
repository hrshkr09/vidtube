//use it whenever u want copy and paste and use it , this is a standard stuff

import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";


const errorHandler = (err, req, res, next)=>{
    let error = err

    if(!(error instanceof ApiError)){
        const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500

        const message = error.message || "Something went wrong"

        error =  new ApiError(statusCode, message, error?.errors || [], err.stack)//look here
    }

    const response ={
        ...error, message: error.message,
        ...ApiError(process.env.NODE_ENV === "development" ? {stack : error.stack} : {})
    }

    return res.status(error.statusCode).json(response)
}


export {errorHandler}