const notFound = (req,res,next)=>{
    const error =  new Error(`Not Found: ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({msg: err?.message, stack: err?.stack})
}

module.exports = { notFound, errorHandler }