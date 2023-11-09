import {Application} from "express";
import authRouter from "./user/userRoutes";
import adminAuthRouter from './admin/AdminRoter'
import postRouter from './user/postRoutes'

const routes=(app:Application)=>{
    app.use("/api",authRouter())

    app.use('/api/admin',adminAuthRouter());
    
    app.use("/api", postRouter());
}
export default routes;