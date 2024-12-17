const user = require("../db/models/user");
const task = require("../db/models/task");

class Task {
  allTasks = async (filter) => {
    try {
      const result = await task.findAll({ where: filter, include: user });
      return result;
    } catch (error) {
      throw error;
    }
  };

  taskById = async (projectId, existingUserId) => {
    try {
      const result = await task.findOne({
        where: { id: projectId, userId: existingUserId },
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  editTask = async (projectId, existingUserId) => {
    try {
      const result = await task.findOne({
        where: { id: projectId, userId: existingUserId },
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  deleteTask = async (projectId, existingUserId) => {
    try {
      const result = await task.findOne({
        where: { id: projectId, userId: existingUserId },
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  addNewTask = async (body, existingUserId) => {
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
}

module.exports = Task;
