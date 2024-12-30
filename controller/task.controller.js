const { allTasks, taskById, editTask, deleteTask, addNewTask } = require('../services/task.services');

const getAllTask = async (request, response) => {
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

  try {
    const result = await allTasks({ ...filter, userId: existingUserId });
    return response.status(200).json({
      status: true,
      data: result,
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getTaskById = async (request, response) => {
  const existingUserId = request.user.id;
  const projectId = request.params.id;

  try {
    const result = await taskById(projectId, existingUserId);

    if (!result) {
      return response.status(404).json({ message: 'Invalid project id for the current user' });
    }

    return response.status(200).json({
      status: true,
      data: result,
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const updateTaskById = async (request, response) => {
  const existingUserId = request.user.id;
  const projectId = request.params.id;
  const body = request.body;

  try {
    const result = await editTask(projectId, existingUserId);

    if (!result) {
      return response.status(404).json({ message: 'Invalid project id for the current user' });
    }

    result.title = body.title;
    result.description = body.description;
    result.priority = body.priority;
    result.dueDate = body.dueDate;
    result.status = body.status;

    const updatedResult = await result.save();

    return response.status(200).json({
      status: true,
      message: 'Task has been updated',
      data: updatedResult,
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const deleteTaskById = async (request, response) => {
  const existingUserId = request.user.id;
  const projectId = request.params.id;

  try {
    const result = await deleteTask(projectId, existingUserId);

    if (!result) {
      return response.status(404).json({ message: 'Invalid project id for the current user' });
    }

    await result.destroy();
    return response.status(200).json({
      status: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const createTask = async (request, response) => {
  const existingUserId = request.user.id;

  try {
    const newTask = await addNewTask({ ...request.body }, existingUserId);

    return response.status(201).json({
      status: true,
      message: 'Task created successfully',
      data: newTask,
    });
  } catch (error) {
    if (error.message.includes('invalid input syntax for type timestamp')) {
      return response.status(400).json({
        status: false,
        message: 'Invalid date format. Please provide a valid date.',
      });
    }

    if (error.message.includes('invalid input value for enum')) {
      return response.status(400).json({
        status: false,
        message: `Invalid value provided. ${error.message}`,
      });
    }

    return response.status(500).json({
      status: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
