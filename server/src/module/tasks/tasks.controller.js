// server\src\module\tasks\tasks.controller.js
import ApiResponse from "../../common/utils/api.response.js"
import * as tasksService from "./tasks.service.js"

const postTasks = async (req, res, next) => {
    try {
        const task = await tasksService.postTasks(req.body, req.user);
        ApiResponse.created(res, "Task created successfully", task)
    } catch (err) { next(err) }
}

const getTasks = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 6));
        const result = await tasksService.getTasks(req.user, { page, limit });
        ApiResponse.ok(res, "Tasks fetched successfully", result)
    } catch (err) { next(err) }
}

const updateTask = async (req, res, next) => {
    try {
        const task = await tasksService.updateTask(req.params.id, req.body, req.user);
        ApiResponse.ok(res, "Task updated successfully", task)
    } catch (err) { next(err) }
}

const deleteTask = async (req, res, next) => {
    try {
        await tasksService.deleteTask(req.params.id, req.user);
        ApiResponse.noContent(res)
    } catch (err) { next(err) }
}

export { postTasks, getTasks, updateTask, deleteTask }
