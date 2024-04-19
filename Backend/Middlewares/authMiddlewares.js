const User = require('../Models/userModels.js');
const jwt = require('jsonwebtoken');
const ascyncHandler = require('express-async-handler');


const authMiddlewares = ascyncHandler (async (req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decoded);
            }

        }catch(error){
            throw new Error('Not Authorized, token expired, please login again');
        }

    } else {
        throw new Error('There is no token to header');
    }
});
module.exports = {authMiddlewares};
