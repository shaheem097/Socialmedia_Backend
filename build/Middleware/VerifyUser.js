"use strict";
// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import User from '../framework/database/mongodb/models/usermodels/userModel'; // Import the User model with its TypeScript type
// const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
//   const token: string | undefined = req.cookies.jwt;
//   // Check if the JSON web token exists and is verified
//   if (token) {
//     jwt.verify(token, 'secret of my application', (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         res.redirect('/login');
//       } else {
//         console.log(decodedToken);
//         next();
//       }
//     });
//   } else {
//     res.redirect('/login');
//   }
// };
// // Check the current users
// const checkUser = (req: Request, res: Response, next: NextFunction): void => {
//     console.log("vannuuuuuuuuuuuuuuuuuuuuuuuuuu");
//   const token: string | undefined = req.localStorage.userAccessToken;
//   if (token) {
//     jwt.verify(token, 'secret of my application', async (err, decodedToken) => {
//       if (err) {
//         // console.log(err.message);
//         res.locals.user = null;
//         next();
//       } else {
//         let user: any | null = await User.findById(decodedToken);
//         console.log(user,'verifyyyyyyyyyyyyyyyyyyy');
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };
// export { requireAuth, checkUser };
