const {Router} = require("express")
let usersController = require("../controllers/usersController")

const userRoutes = Router();

function myMiddleware(request,response,next){
    console.log("voce passou pelo middlaware");

    next();
}


const usersControllers = new usersController();
userRoutes.post("/",myMiddleware,usersControllers.create);

userRoutes.put("/:id",usersControllers.update);

userRoutes.delete("/:id",usersControllers.delete)


module.exports = userRoutes;