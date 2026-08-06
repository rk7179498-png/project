import express from "express";
import isAuth  from "../7_current.user.js/isAuth.js"
import { addItem, editItem } from "../8_user.role/item.role.js";
import { upload } from "../9_cloudinari.multer/multer.js";

const itemRouter = express.Router();
itemRouter.post("/add-item",isAuth,upload.single("image"),addItem)
itemRouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem)

export default itemRouter;