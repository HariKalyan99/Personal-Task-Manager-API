const user = require("../db/models/user");
const task = require("../db/models/task");

const allTasks = async (filter) => {
  try {
    const result = await task.findAll({ where: filter, include: user });
    return result;
  } catch (error) {
    throw error;
  }
};

const taskById = async (projectId, existingUserId) => {
  try {
    const result = await task.findOne({
      where: { id: projectId, userId: existingUserId },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const editTask = async (projectId, existingUserId) => {
  try {
    const result = await task.findOne({
      where: { id: projectId, userId: existingUserId },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (projectId, existingUserId) => {
  try {
    const result = await task.findOne({
      where: { id: projectId, userId: existingUserId },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const addNewTask = async (body, existingUserId) => {
  try {
    const result = await task.create({
      ...body,
      userId: existingUserId,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { allTasks, taskById, editTask, deleteTask, addNewTask };
