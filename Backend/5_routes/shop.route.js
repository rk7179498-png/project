import express from "express";

import isAuth from "../7_current.user.js/isAuth.js";
import createShop,{getMyShop} from "../8_user.role/shop.role.js";
import { upload } from "../9_cloudinari.multer/multer.js";

const shopRouter = express.Router();
shopRouter.post("/creat_shop",isAuth,upload.single("image"),createShop)
shopRouter.get("/My-Shop",isAuth,getMyShop)

export default shopRouter;