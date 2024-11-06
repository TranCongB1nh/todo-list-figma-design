module.exports = {
    task: {
        value: '/tasks', // phần chung trong đường dẫn URL liên quan đến task
        addTask: {
            value: '/add-task'
        },
        updateTask: {
            value: '/update-task'
        },
        getTask: {
            value: '/get-tasks'
        },
        deleteTask: {
            value: '/delete-task/:id'
        }
    },
    user: {
        signIn: {
            value: '/sign-in'
        },
        signUp: {
            value: '/sign-up'
        }
    }
}