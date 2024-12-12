const dotenv = require("dotenv");
dotenv.config({path: `${process.cwd()}/.env`})//standard way to write env
const express = require("express");
const router = require("./route/auth.route");


const PORT = process.env.APP_PORT || 8082
const app = express();
app.use(express.json());
app.use("/api/v1/auth", router);
app.use("*", (_, response) => {
    response.status(404).json({status: "failed", message: "404 Not found"})
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})