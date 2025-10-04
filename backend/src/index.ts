import express from "express";
import "dotenv/config";
import morgan from "morgan";

import connectDB from "./config/db";

import authRouter from "./routes/auth.route";
// import orderRouter from "./routes/order.route"

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "backend is up and running"
  });
});
app.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (err) {
    next(err);
  }
});
app.use("/auth", authRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});
