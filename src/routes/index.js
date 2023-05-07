const {Router} = require("express");

const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");


const routes = Router();
routes.use("/user",usersRouter);

routes.use("/notes",notesRouter);

routes.use("/tags",tagsRouter);


module.exports = routes;

// Inner Join e uma forma de voce fazer uma consulta a dois banco de dados e retornar as duas consultas de forma unificada.
