const express = require("express");
const cors = require("cors");
const authRouter = require("./route/auth.route");
const taskRouter = require("./route/task.route");
const globalErrorHandler = require("./controller/error.controller");
const sequelize = require("./connection/connectToSQL");
const config = require("./config");

const app = express();
const PORT = config.appport;
app.use(
  cors({
    origin: "https://task-manger-fullstack.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", taskRouter);

app.use(
  "*",
  async (request, response, next) => {
    response
      .status(404)
      .json({ message: `Can't find ${request.originalUrl} on the server` });
    next();
  },
  globalErrorHandler,
);

sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch(console.log);
