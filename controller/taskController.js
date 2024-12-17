const AppError = require("../middlewares/appError");
const catchAsync = require("../middlewares/catchAsync");
const Task = require("../services/task.services");
const { allTasks, taskById, editTask, deleteTask, addNewTask } = new Task();

const getAllTask = catchAsync(async (request, response, _) => {
  const { priority, startDate, endDate, status } = request.query;

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
  const result = await allTasks(filter);
  return response.status(201).json({
    status: "success",
    data: result,
  });
});

const getTaskById = catchAsync(async (request, response, next) => {
  const existingUserId = request.user.id;
  const projectId = request.params.id;
  const result = await taskById(projectId, existingUserId);
  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }
  return response.status(201).json({
    status: "success",
    data: result,
  });
});

const updateTaskById = catchAsync(async (request, response, next) => {
  const existingUserId = request.user.id;
  const projectId = request.params.id;
  const body = request.body;
  const result = await editTask(projectId, existingUserId);
  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }
  result.title = body.title;
  result.description = body.description;
  result.priority = body.priority;
  result.dueDate = body.dueDate;
  result.status = body.status;

  const updatedResult = await result.save();
  return response.status(201).json({
    status: "success",
    data: updatedResult,
  });
});

const deleteTaskById = catchAsync(async (request, response, next) => {
  const existingUserId = request.user.id;
  const projectId = request.params.id;
  const result = await deleteTask(projectId, existingUserId);
  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }

  await result.destroy();
  return response.status(201).json({
    status: "success",
    data: "Task deleted successfully",
  });
});

const createTask = catchAsync(async (request, response, _) => {
  const existingUserId = request.user.id;
  const newTask = await addNewTask({...request.body}, existingUserId);

  return response.status(201).json({
    status: "success",
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
