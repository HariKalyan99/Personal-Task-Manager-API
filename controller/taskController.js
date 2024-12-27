const AppError = require("../middlewares/appError");
const catchAsync = require("../middlewares/catchAsync");
const Task = require("../services/task.services");
const { allTasks, taskById, editTask, deleteTask, addNewTask } = new Task();

const getAllTask = catchAsync(async (request, response, _) => {
  const { priority, startDate, endDate, status } = request.query;
  const existingUserId = request.user.id;
  const filter = {};

  if (priority) {
    filter.priority = priority;
  }

  if (status) {
    filter.status = status;
  }

  if (startDate || endDate) {
    filter.dueDate = {};
    if (startDate) {
      filter.dueDate.$gte = new Date(startDate);
    }
    if (endDate) {
      filter.dueDate.$lte = new Date(endDate);
    }
  }
  const result = await allTasks({...filter, userId: existingUserId});
  return response.status(201).json({
    status: true,
    data: result,
  });
});

const getTaskById = catchAsync(async (request, response, next) => {
  const existingUserId = request.user.id;
  const projectId = request.params.id;
  const result = await taskById(projectId, existingUserId);
  
  if (!result) {
    return next(new AppError("Invalid project id for the current user", 400));
  }
  return response.status(201).json({
    status: true,
    data: result,
  });
});

const updateTaskById = catchAsync(async (request, response, next) => {
  const existingUserId = request.user.id;
  const projectId = request.params.id;
  const body = request.body;
  const result = await editTask(projectId, existingUserId);
  if (!result) {
    return next(new AppError("Invalid project id for the current user", 400));
  }
  result.title = body.title;
  result.description = body.description;
  result.priority = body.priority;
  result.dueDate = body.dueDate;
  result.status = body.status;

  const updatedResult = await result.save();
  return response.status(201).json({
    status: true,
    message: "Blog has been updated",
    data: updatedResult,
  });
});

const deleteTaskById = catchAsync(async (request, response, next) => {
  const existingUserId = request.user.id;
  const projectId = request.params.id;
  const result = await deleteTask(projectId, existingUserId);
  if (!result) {
    return next(new AppError("Invalid project id for the current user", 400));
  }

  await result.destroy();
  return response.status(201).json({
    status: true,
    message: "task deleted",
    data: "Task deleted successfully",
  });
});

const createTask = catchAsync(async (request, response, _) => {
  const existingUserId = request.user.id;
  const newTask = await addNewTask({...request.body}, existingUserId);

  return response.status(201).json({
    status: true,
    message: "Task created successfully",
    data: newTask,
  });
});

module.exports = {
  createTask,
  getAllTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
