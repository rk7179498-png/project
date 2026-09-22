import express from "express"
import login from "../controller/login.js"
const UserRouter=express.Router()
UserRouter.post("/login",login)
export default UserRouter
