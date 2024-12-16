const task = require("../models/task");
const user = require("../models/user");

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


  createTask = async (body, existingUserId) => {
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
