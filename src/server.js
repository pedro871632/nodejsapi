require("express-async-errors")
const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/appError")
const express = require("express");
const routes = require("./routes");

const app = express();

migrationsRun();


app.use(express.json());
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


const PORT = 3333;

app.listen(PORT,() => console.log(`Server running on Port ${PORT}`))

