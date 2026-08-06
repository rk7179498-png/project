import express from "express";
import cookieParser from "cookie-parser";
import router from "./5_routes/routes.js";
import cors from "cors";
import userRouter from "./5_routes/use.route.js";
import { connectdb } from "./1_mongodb/db.js";
import shopRouter from "./5_routes/shop.route.js";
import itemRouter from "./5_routes/item.route.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT;

// cors() :

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use("/api/user",userRouter)
app.use("/api/shop",shopRouter)
app.use("/api/user",itemRouter)

app.listen(port, () => {
  connectdb();
  console.log(`Server started on port ${port}`);
});
