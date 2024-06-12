const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler())
        .catch((error) => {
            next(error)
        })
    }
}

export { asyncHandler } 


// const asyncHandler = (fun) => async (req, res, next) => {
//     try{
//         fun(req, res, next)
//     }catch(error) {
//         res.status(500).json({
//             success: false,
//             message: error.msg
//         })
//     }
// }