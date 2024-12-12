const task = require("../db/models/task");
const user = require("../db/models/user");
const AppError = require("../middlewares/appError");
const catchAsync = require("../middlewares/catchAsync");



const getAllTask = catchAsync(async (request, response, next) => {
    const result = await task.findAll({include: user});

    return response.status(201).json({
        status: 'success',
        data: result
    })
})

const getTaskById = catchAsync(async (request, response, next) => {
    const projectId = request.params.id
    const result = await task.findByPk(projectId, {include: user});
    if(!result){
        return next(new AppError('Invalid project id', 400))
    }
    return response.status(201).json({
        status: 'success',
        data: result
    })
})

const createTask = catchAsync(async (request, response, next) => {
    const existingUserId = request.user.id
    const newTask = await task.create({
        ...request.body, userId: existingUserId
    })

    return response.status(201).json({
        status: 'success',
        data: newTask
    })
})

module.exports = {createTask, getAllTask, getTaskById};