const db = require("../models")

const Post = db.post
const User = db.user

// read /home - find all the post in the database
exports.findAll = async (req, res) => {
    await Post.find()
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all the posts."
            })
        })
}

// read /home/:postId - find a single post with an id
exports.findOne = async (req, res) => {
    const postId = req.params.postId;
    await Post.findById(
        { _id: postId })
        .then((data) => {
            // validation
            if (!data) {
                return res.status(400).send({ message: "Not found post with id" + postId })
            } else {
                res.send(data)
            }
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding one post"
            })
        })
}

// post /profile/post - create a post
exports.createPost = async (req,res) => {
    // make sure to write it out later
    const { username, image, description } = req.body;
    //Validate request
    if(!req.body.username){
        res.status(400).send({message: "Username cannot be empty!"})
    }
    //Create a post
    const newPost = new Post({ username, image, description })
    // Save Post in the database
    await newPost
        .save()
        .then((data) => {
            res.status(201).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a Pet."
            })
        })
}


// delete /profile/:postId - delete a single post with an id 
exports.deletePost = (req, res) => {
    if(!req.userId){
        res.status(400).send({message: "You can only delete your own post!"})
    }
    const postId = req.params.postId

    User.findByIdAndUpdate(
        { _id: req.userId },
        {
            "$pull": { ObjectId: req.body.postId }
        }
    )
    // delete post by the id being passed by id
    Post.deleteOne(
        { _id: postId })
        .then((data) => {
            // validation
            if (!data) {
                return res.status(400).send({ message: "Not found post with id" + postId })
            } else {
                res.send(data)
            }
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting one post"
            })
        })
}

// update /profile/:postId - update a single comment with an id 
exports.updatePost = async (req, res) => {
    if(!req.userId){
        res.status(400).send({message: "You can only update your own post!"})
    }
    const postId = req.params.postId

    const updatedPost = { username, image, description, _id: id };

    await Post.findByIdAndUpdate(
        { _id: postId }, updatedPost, { new: true }
    )
    .then((data) => {
        if(!data) {
            res.status(400).send({message: "Post not found with id" + postId})
        } else {
            res.send(data)
        }
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occured while updating this post!"
        })
    })
}

// update /profile/:postId && /home/:postId
exports.likePost = async (req, res) => {
    const postId = req.params.postId

    await Post.findByIdAndUpdate(
        { _id: postId }, { likeCount: post.likeCount + 1 }, { new: true }
    )
    .then((data) => {
        if(!data) {
            res.status(400).send({message: "Post not found with id" + postId})
        } else {
            res.send(data)
        }
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occured while liking this post!"
        })
    })

    res.json(updatedPost);
}
