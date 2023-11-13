import express from "express";
import postControllers from '../../../../adapters/controller/user/postController';
import {postRepository} from '../../../../application/repositories/user/postDbRepositoryInterface';
import {postRepositoryMongoDb} from '../../../database/mongodb/repositories/user/postRepositoryImp';
const authenticateToken = require('../../middlewares/userAuthenticateToken')


const postRouter =()=>{
    const router =express.Router();

    const controllers:any =postControllers(
        postRepository,
        postRepositoryMongoDb
    );
    
    router.post("/:userId",authenticateToken,controllers.addPost)
    
    // router.get('/getAllPost',authenticateToken,controllers.getAllPost)

    router.get('/getAllPost/:userId',authenticateToken,controllers.fetchPosts)

    router.get("/userPost/:userId",authenticateToken, controllers.fetchUserPosts);

    router.get('/getusersData/:userId',authenticateToken,controllers.getUsersData)

    router.put("/:postId/like", authenticateToken,controllers.likedPost);

    router.put("/:postId/unLike",authenticateToken, controllers.unLikePost);

    router.put("/:postId/comment", controllers.addComment);

    return router;
}

export default postRouter