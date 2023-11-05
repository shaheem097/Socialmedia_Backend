
import configKeys from '../../../config/config';
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey =configKeys.secretKey 

function authenticateToken(req: { headers: { [x: string]: any; }; header: any; user: any; }, res: {
    status(arg0: number): unknown; json: (arg0: { status: boolean; message: string; }) => any; 
}, next: () => void) {
  console.log(req.headers,"headersssssssssss");
  console.log(req.header,"headerrrrrrrr");
  const token = req.headers['authorization']
 
  console.log(token,"oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
  
if (token){
    
  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err){
        console.log("not successs token");
        return res.status(401).json({status:false,message:"verify token not found"});
    } 
    console.log("sucesssssss,oppppppppppppppppppppppppppppppppppppppppppppppppppppppp");
    req.user = user;
    next();
  });
} else{
    return res.status(401).json({status:false,message:"token not found"});
}

}


module.exports = authenticateToken;