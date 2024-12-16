const task = require("../db/models/task");
const user = require("../db/models/user");
const AppError = require("../middlewares/appError");
const catchAsync = require("../middlewares/catchAsync");

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
  const result = await task.findAll({ where: filter, include: user });
  return response.status(201).json({
    status: "success",
    data: result,
  });
});

const getTaskById = catchAsync(async (request, response, next) => {
  const existingUserId = request.user.id;
  const projectId = request.params.id;
  const result = await task.findOne({
    where: { id: projectId, userId: existingUserId },
  });
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
  const result = await task.findOne({
    where: { id: projectId, userId: existingUserId },
  });
  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }
  result.title = body.title;
  result.description = body.description;
  result.priority = body.priority;
  result.dueDate = body.dueDate;
  result.status = body.status;
  result.userId = body.userId;
  const updatedResult = await result.save();
  return response.status(201).json({
    status: "success",
    data: updatedResult,
  });
});

const deleteTaskById = catchAsync(async (request, response, next) => {
  const existingUserId = request.user.id;
  const projectId = request.params.id;
  const result = await task.findOne({
    where: { id: projectId, userId: existingUserId },
  });
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
  const newTask = await task.create({
    ...request.body,
    userId: existingUserId,
  });

  return response.status(201).json({
    status: "success",
    data: newTask,s
  });
});

module.exports = {
  createTask,
  getAllTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
