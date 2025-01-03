const express = require("express");
const cors = require("cors");
const taskRouter = require("./route/task.route");
const authRouter = require("./route/auth.route");
const globalErrorHandler = require("./controller/error.controller");
const sequelize = require("./connection/connectToSQL");
const config = require("./config");
const morgan = require("morgan");
const logger = require("./logger");

const morganFormat = ":method :url :status :response-time ms";

const app = express();
const PORT = config.appport;
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://task-manger-fullstack.vercel.app"
        : "*",
    credentials: true,
  }),
);
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
          timestamps: new Date().toISOString()
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  }),
);

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", taskRouter);

app.use("*", (request, response) => {
  return response
    .status(404)
    .json({ message: `Can't find ${request.originalUrl} on the server` });
});

app.use(globalErrorHandler);

sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch(console.log);
