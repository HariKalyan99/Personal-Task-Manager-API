import dotenv from "dotenv";
dotenv.config({path: `${process.cwd()}/.env`}); //stndard way to write env
import express from "express";
import authRouter from "./route/auth.route.js";

const PORT = process.env.APP_PORT || 8082
const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("*", (_, response) => {
    response.status(404).json({status: "failed", message: "404 Not found"})
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})