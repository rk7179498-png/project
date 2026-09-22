import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import UserRouter from "./route/userRoute.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 7001;

app.use(express.json());


app.use("/", UserRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Auth Service Working",
  });
});

app.listen(port, () => {
  console.log(`Auth Service started on http://localhost:${port}`);
  connectDb();
});