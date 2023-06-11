const {verify} = require("jsonwebtoken");
const AppError = require("../utils/appError");
const authConfig = require("../config/auth");
const appError = require("../utils/appError");

function ensureAuthenticated(request,response,next){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new appError("JWT NOT INFORMED",401); 
    }

    const [,token] = authHeader.split(" ")

    try {
       const {sub:user_id} =  verify(token,authConfig.jwt.secret);

       request.user = {
        id:Number(user_id)
       };
    
       return next();    
    }

    catch{
        throw new AppError("JWT TOKEN INVALIDO")
    }


    



}

module.exports = ensureAuthenticated;