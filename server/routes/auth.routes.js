const { verifySignup } = require('../middlewares')
const controller = require('../controllers/auth.controller')

module.exports = function(app) {
    app.use((req, res, next) => {
        //Set header and allow use of x access token (we will use this to pass our token)
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token', Origin, Content-type, Accept"
        )
        next()
    })
    
    //Set up signup route and pass middlewares to check username, email and roles
    app.post('/api/auth/signup',
    [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
    controller.signup
    )

    //Handle signin
    app.post('/api/auth/signin', controller.signin)
}