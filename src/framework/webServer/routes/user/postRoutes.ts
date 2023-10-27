import express from "express";
import postControllers from '../../../../adapters/controller/user/postController';
import {postRepository} from '../../../../application/repositories/user/postDbRepositoryInterface';
import {postRepositoryMongoDb} from '../../../database/mongodb/repositories/user/postRepositoryImp';


const postRouter =()=>{
    const router =express.Router();

    const controllers:any =postControllers(
        postRepository,
        postRepositoryMongoDb
    );
    
    router.post("/:userId",controllers.addPost)
    router.get('/getAllPost',controllers.getAllPost)
    return router;
}

export default postRouter