const asyncHandler = (requestHandler)=>{
    promise.resolve(
        requestHandler(req,res,next)
    ).catch((err)=> next(err))
}


export {asyncHandler}