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

const getTasks = async ({ id }) => {
    return await Task.find({ createdBy: id });
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