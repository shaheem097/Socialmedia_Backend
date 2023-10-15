import express, { Application, NextFunction } from "express";
import morgan from "morgan";
import CORS from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";

const expressConfig=(app:Application)=>{

    const corsOptions = {
        origin: "*",
        exposedHeaders: [
          "Cross-Origin-Opener-Policy: same-site ",
          "Cross-Origin-Embedder-Policy: require-corp",
          "Cross-Origin-Resource-Policy : same-site",
      

        ],
      };


    app.use(CORS({origin:['http://localhost:3000'], // Update with your client's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // Allow credentials (cookies, etc.)
}));

    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use((req,res,next)=>{
         res.setHeader('Cross-Origin-Opener-Policy','same-origin')
         next();
    })
};

export default expressConfig