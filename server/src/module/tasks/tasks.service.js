// server\src\module\tasks\tasks.service.js
import Task from "./tasks.model.js";

const postTasks = async ({ title, description, status }, { id }) => {
    const task = await Task.create({
        title,
        description,
        status,
        createdBy: id,
    });

    return task;
}

const getTasks = async ({ id }, { page = 1, limit = 6 } = {}) => {
    const skip = (page - 1) * limit;
    const [tasks, total] = await Promise.all([
        Task.find({ createdBy: id }).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Task.countDocuments({ createdBy: id }),
    ]);
    return { tasks, total, page, totalPages: Math.ceil(total / limit) };
}

const updateTask = async (taskId, body, { id }) => {
    const task = await Task.findOneAndUpdate(
        { _id: taskId, createdBy: id },
        body,
        { new: true, runValidators: true }
    );
    return task;
}

const deleteTask = async (taskId, { id }) => {
    const task = await Task.findOneAndDelete({ _id: taskId, createdBy: id });
    return task;
}

export { postTasks, getTasks, updateTask, deleteTask }