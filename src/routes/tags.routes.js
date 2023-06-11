const {Router} = require("express");
const tagRouter = Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const tagsController = require("../controllers/tagsController");
const TagsController = new tagsController();

tagRouter.get("/",ensureAuthenticated,TagsController.index);

module.exports = tagRouter;