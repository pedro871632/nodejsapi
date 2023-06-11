require("express-async-errors")
require("dotenv/config");
const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/appError")
const express = require("express");
const routes = require("./routes");
const uploadConfig = require("./config/upload");
const cors = require("cors");


const app = express();
app.use(cors());
migrationsRun();


app.use(express.json());
app.use("/files",express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes);

app.use((error,request,response,next)=>{
    if (error instanceof  AppError){
        return response.status(error.statusCode).json({
            status:"error",
            message: error.message
        })
    }

    return response.status(500).json({
        status:"error",
        message:"Internal server error.",
        error
    })
})


const PORT = process.env.SERVER_PORT;

app.listen(PORT,() => console.log(`Server running on Port ${PORT}`))

    