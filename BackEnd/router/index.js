const taskRouter = require("./taskRouter")
const userRouter = require("./userRouter")
const router = { // định nghĩa đối tượng router với phương thức run
    run: function (request, response) {
        taskRouter.run(request, response) // khi router.run được gọi nó sẽ chuyển tiếp đến 2 router con này
        userRouter.run(request, response)
    }
}

module.exports = router