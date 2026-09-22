import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors({ 
  origin: process.env.FRONTEND_URL || "http://localhost:5173", 
  credentials: true 
})
);

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;
const authServiceUrl = process.env.AUTH_SERVICE_URL;

app.use("/auth", proxy(authServiceUrl));

app.get("/", (req, res) => {
  res.json({
    message: "API Gateway / Auth Service Working",
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});