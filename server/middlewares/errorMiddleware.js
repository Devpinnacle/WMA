const sendErrorDev=(err,res)=>{
    console.error("Error:",err);
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack
    });
}

//* Global Error Handler ****************************************************

module.exports=(err,req,res,next)=>{
    if(res.headersSent){
        return next(err);
    }

    err.statusCode=err.statusCode||500;
    err.status=err.status||"ERROR";

    if(process.env.NODE_ENV==="development"){
        sendErrorDev(err,res);
    }
}