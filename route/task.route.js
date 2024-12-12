const express = require("express");
const { createTask, getAllTask, getTaskById } = require("../controller/taskController");
const { authentication } = require("../controller/auth.controler");
const router = express.Router();




router.post("/tasks", authentication, createTask);
router.get("/tasks", authentication, getAllTask);
router.get("/tasks/:id", authentication, getTaskById);



module.exports = router;