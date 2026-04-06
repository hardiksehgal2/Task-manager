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
        const tasks = await tasksService.getTasks(req.user);
        ApiResponse.ok(res, "Tasks fetched successfully", tasks)
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
