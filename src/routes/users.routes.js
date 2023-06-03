const {Router} = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const multer = require("multer");
const uploadConfig = require("../config/upload");

let usersController = require("../controllers/usersController")

const upload = multer(uploadConfig.MULTER)

const userRoutes = Router();

const usersControllers = new usersController();


userRoutes.post("/",usersControllers.create);

userRoutes.put("/",ensureAuthenticated,usersControllers.update);

userRoutes.delete("/:id",usersControllers.delete);

userRoutes.patch("/avatar",ensureAuthenticated,upload.single("avatar"))


module.exports = userRoutes;