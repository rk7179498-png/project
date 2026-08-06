import express from "express";
import getCurrentUser from "../7_current.user.js/currentUser.js";
import isAuth from "../7_current.user.js/isAuth.js";

const userRouter = express.Router();

userRouter.get("/current",isAuth,getCurrentUser)


export default userRouter;