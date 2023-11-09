import { Response } from 'express'; // Import the Response type from express

import configKeys from '../../../config/config';
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = configKeys.secretKey;

function authenticateToken(req: { headers: { [x: string]: any; }; header: any; user: any; }, res: Response, next: () => void) {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, secretKey, (err: any, user: any) => {
      if (err) {
        console.log("not user success token");
        return res.status(401).json({ status: false, message: "userTokenNotverify" });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ status: false, message: "userTokenNotverify" });
  }
}

module.exports = authenticateToken;
