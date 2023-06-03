const {Router} = require("express");
const tagRouter = Router();

const tagsController = require("../controllers/tagsController");
const TagsController = new tagsController();

tagRouter.get("/",TagsController.index);

module.exports = tagRouter;