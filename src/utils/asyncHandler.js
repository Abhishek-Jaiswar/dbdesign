/**
 * This utility function wraps an asynchronous route handler to manage exceptions.
 * It simplifies error handling in Express routes by catching errors and passing 
 * them to the next middleware, thus avoiding the need for repetitive try-catch blocks.
 * 
 * Usage:
 *  app.get('/route', asyncHandler(async (req, res, next) => {
 *      const data = await someAsyncFunction();
 *      res.json(data);
 *  }));
 * 
 * @param {Function} requestHandler - An asynchronous function that handles the request.
 * @returns {Function} A function that executes the request handler and catches any errors.
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => {
                next(error);
            });
    };
};

export { asyncHandler };



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