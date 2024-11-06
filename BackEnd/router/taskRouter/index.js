const routerMethods = require("../methods.js");
const routes = require("../routes.js");
const taskControllers = require('../../controllers/tasks/index.js')
const authenticateToken = require('../../middleware/authMiddleware.js')

const taskRouter = {
  run(request, response) {
    routerMethods.get(
      request,
      response,
      routes.task.value + routes.task.getTask.value,
      authenticateToken(taskControllers.handleGetTasksByToken)
    );
    routerMethods.post(
      request,
      response,
      routes.task.value + routes.task.addTask.value,
      authenticateToken(taskControllers.handleAddTask)
    );
    routerMethods.put(
      request,
      response,
      routes.task.value + routes.task.updateTask.value,
      authenticateToken(taskControllers.handleUpdateTask)
    );
    routerMethods.delete(
      request,
      response,
      routes.task.value + routes.task.deleteTask.value,
      authenticateToken(taskControllers.handleDeleteTaskById)
    );
  },
};
module.exports = taskRouter;