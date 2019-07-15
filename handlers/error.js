function errorHandler(error, req,res,next){
    return res.status(error.status || 500).json({
        error:{
            Message: error.message || "Oops !Something went wrong."
        }
    })
};


module.exports= errorHandler