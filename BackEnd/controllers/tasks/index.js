require('dotenv').config()
const { MongoClient } = require("mongodb")
const { httpStatusCodes } = require("../../utils/constant")
const uri = process.env.MONGO_URI
const client = new MongoClient(uri)
const { ObjectId } = require('mongodb')
const Task = require('../../models/task')

async function handleAddTask(request, response) {
  try {
    const chunks = [];
    request.on("data", (chunk) => {
      chunks.push(chunk);
    });

    request.on("end", async () => {
      const taskData = JSON.parse(Buffer.concat(chunks).toString());
      const user = request.user; // Lấy user từ request

      // Kiểm tra xem user có tồn tại và có userId hay không
      if (!user || !user.userId) {
        console.error("User not authenticated or missing userId");
        response.statusCode = httpStatusCodes.UNAUTHORIZED;
        response.end(JSON.stringify({ error: "User not authenticated." }));
        return;
      }

      const newTask = new Task({ ...taskData, userId: user.userId });
      await newTask.save();

      response.statusCode = httpStatusCodes.CREATED;
      response.end(JSON.stringify({ message: "Task created successfully", task: taskData }));
    });
  } catch (error) {
    console.error("Error:", error);
    response.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    response.end(JSON.stringify({ error: 'Internal server error', details: error.message }));
  }
}

async function handleGetTasksByToken(request, response) {
  try {
    const user = request.user;

    if (!user || !user.userId) {
      response.statusCode = httpStatusCodes.UNAUTHORIZED;
      response.end(JSON.stringify({ error: "User not authenticated." }));
      return;
    }

    const userTasks = await Task.find({ userId: user.userId }); // Sử dụng mongoose để tìm tasks

    response.statusCode = httpStatusCodes.OK;
    response.end(JSON.stringify(userTasks));
  } catch (error) {
    console.error("Error: ", error);
    response.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    response.end(JSON.stringify({ error: "Internal server error", details: error.message }));
  }
}

async function handleUpdateTask(request, response) {
  try {
    const chunks = [];
    request.on("data", (chunk) => {
      chunks.push(chunk);
    });

    request.on("end", async () => {
      const taskData = JSON.parse(Buffer.concat(chunks).toString());
      const taskId = new ObjectId(taskData._id);
      const user = request.user;

      // Fetch the task to verify user ownership
      const task = await Task.findOne({ _id: taskId });
      if (!task || task.userId.toString() !== user.userId.toString()) {
        response.statusCode = httpStatusCodes.FORBIDDEN;
        response.end("You do not have permission to update this task");
        return;
      }

      // Prepare fields to update, including `completed` status if provided
      const updateFields = {};
      if (taskData.text) {
        updateFields.text = taskData.text;
      }

      if (typeof taskData.completed !== 'undefined') {
        updateFields.completed = taskData.completed;
      }

      const result = await Task.updateOne({ _id: taskId }, { $set: updateFields });

      if (result.matchedCount === 0) {
        response.statusCode = httpStatusCodes.NOT_FOUND;
        response.end("Task not found");
        return;
      }

      response.statusCode = httpStatusCodes.OK;
      response.end(JSON.stringify({ message: "Task updated successfully", task: updateFields }));
    });
  } catch (error) {
    console.error("Error updating task:", error);
    response.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    response.end("Internal server error");
  }
}

async function handleDeleteTaskById(request, response) {
  console.log(request)
  try {
    const chunks = [];
    request.on("data", (chunk) => {
      chunks.push(chunk);
    });
    
    const taskId = request.url.split('/')[3];

    request.on("end", async () => {
      const objectId = new ObjectId(taskId);
      const user = request.user;

      const task = await Task.findOne({ _id: objectId });

      if (!task || task.userId.toString() !== user.userId.toString()) {
        response.statusCode = httpStatusCodes.FORBIDDEN;
        response.end("You do not have permission to delete this task");
        return;
      }

      const result = await Task.deleteOne({ _id: objectId });

      if (result.deletedCount === 0) {
        response.statusCode = httpStatusCodes.NOT_FOUND;
        response.end("Task not found");
        return;
      }

      response.statusCode = httpStatusCodes.OK;
      response.end(`Task with id ${taskId} was deleted`);
    });
  } catch (error) {
    console.error(error);
    response.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    response.end("Internal server error");
  }
}

module.exports = {
  handleAddTask,
  handleGetTasksByToken,
  handleUpdateTask,
  handleDeleteTaskById,
}
