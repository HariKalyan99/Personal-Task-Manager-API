const express = require("express");
const {
  createTask,
  getAllTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controller/taskController");
const authentication = require("../middlewares/auth.middlewares");
const router = express.Router();

router.post("/tasks", authentication, createTask);
router.get("/tasks",  authentication,getAllTask);
router.get("/tasks/:id",  authentication,getTaskById);
router.put("/tasks/:id",  authentication,updateTaskById);
router.delete("/tasks/:id",  authentication,deleteTaskById);

module.exports = router;
