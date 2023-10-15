import {Application} from "express";
import authRouter from "./user/userRoutes";
import adminAuthRouter from './admin/AdminRoter'

const routes=(app:Application)=>{
    app.use("/api",authRouter())
    app.use('/api/admin',adminAuthRouter());
}
export default routes