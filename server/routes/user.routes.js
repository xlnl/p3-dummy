const { authJwt } = require('../middlewares')
const controller = require('../controllers/user.controller')
const posts = require('../controllers/post.controller')

module.exports = function(app) {
    app.use((req, res, next) => {
        //Set header and allow use of x access token (we will use this to pass our token)
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token', Origin, Content-type, Accept"
        )
        next()
    })

    app.get('/', controller.allAccess)

    app.get('/about', [controller.allAccess, controller.About])

    app.get("/api/test/admin", [authJwt.verifyWebToken, authJwt.isAdmin],
    controller.adminBoard
    )

    // user profile - is the findUserPet handler necessary?
    app.get('/profile', [authJwt.verifyWebToken], [controller.userBoard, controller.findUserPets])
    
    // renders form to create a post
    app.post('/profile/upload', [authJwt.verifyWebToken], posts.createPost)
    
    // update post
    app.put('/profile/:postId', [authJwt.verifyWebToken], posts.updatePost)

    // update likes on user's post 
    app.put('/profile/:postId/likePost', posts.likePost);
    
    // delete
    app.delete('/profile/:postId', [authJwt.verifyWebToken], posts.deletePost)
}   