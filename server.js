const express = require("express");
const cors = require('cors');
const authRouter = require("./route/auth.route");
const taskRouter = require("./route/task.route");
const catchAsync = require("./middlewares/catchAsync");
const AppError = require("./middlewares/appError");
const globalErrorHandler = require("./controller/errorController");
const sequelize = require("./connection/database");
const config = require("./config/config");





const app = express();
const PORT = config.APP_PORT;
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", taskRouter);


app.use("*", catchAsync(async(request, _, next) => {
    throw new AppError(`Can't find ${request.originalUrl} on this server`, 404);
}), globalErrorHandler)


sequelize.authenticate().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}).catch(console.log)

