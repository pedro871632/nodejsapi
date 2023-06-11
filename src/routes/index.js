const {Router} = require("express");

const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");
const sessionRouter = require("./sessions.routes");


const routes = Router();



routes.use("/user",usersRouter);

routes.use("/sessions",sessionRouter);

routes.use("/notes",notesRouter);

routes.use("/tags",tagsRouter);

module.exports = routes;


