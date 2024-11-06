const { httpMethods } = require('../../utils/constant')
const routerMethods = require('../methods')
const routes = require('../routes')
const userControllers = require('../../controllers/users/index')

const userRouter = {
    run(request, response) {
        if(request.method === httpMethods.POST && request.url === routes.user.signIn.value) {
            routerMethods.post(
                request, 
                response,
                routes.user.signIn.value,
                userControllers.handleSignIn
            )
        }
        if(request.method === httpMethods.POST && request.url === routes.user.signUp.value) {
            routerMethods.post(
                request, 
                response,
                routes.user.signUp.value,
                userControllers.handleSignUp
            )
        }
    }
}

module.exports = userRouter