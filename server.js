const dotenv = require("dotenv");
dotenv.config({path: `${process.cwd()}/.env`})//standard way to write env
const express = require("express");
const authRouter = require("./route/auth.route");
const taskRouter = require("./route/task.route");
const catchAsync = require("./middlewares/catchAsync");
const AppError = require("./middlewares/appError");
const globalErrorHandler = require("./controller/errorController");


const PORT = process.env.APP_PORT || 8082
const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", taskRouter);
app.use("*", catchAsync(async(request, _, next) => {
    throw new AppError(`Can't find ${request.originalUrl} on this server`, 404);
}), globalErrorHandler)
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

