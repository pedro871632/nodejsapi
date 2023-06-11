const {Router} = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const usersController = require("../controllers/usersController");
const userAvatarController = require("../controllers/userAvatarController");


const upload = multer(uploadConfig.MULTER)

const userRoutes = Router();

const usersControllers = new usersController();


const UserAvatarController = new userAvatarController();

userRoutes.post("/",usersControllers.create);

userRoutes.put("/",ensureAuthenticated,usersControllers.update);

userRoutes.delete("/:id",usersControllers.delete);

userRoutes.patch("/avatar",ensureAuthenticated,upload.single("avatar"),UserAvatarController.update);


module.exports = userRoutes;