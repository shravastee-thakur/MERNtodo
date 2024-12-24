import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/database.js";
import userRouter from "./Routes/userRoute.js";
import todoRouter from "./Routes/todoRoute.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
connectDb();

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
