import { Response } from 'express'; 
import configKeys from '../../../config/config';
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = configKeys.secretKey;

function adminauthenticateToken(req: { headers: { [x: string]: any; }; header: any; user: any; }, res: Response, next: () => void) {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, secretKey, (err: any, user: any) => {
      if (err) {
        console.log("not admin success token");
         
        return res.status(401).json({ status: false, message: "adminTokenNotverify" });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ status: false, message: "adminTokenNotverify" });
  }
}

module.exports = adminauthenticateToken;
