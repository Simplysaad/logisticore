import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.ts";

import orderRouter from "./routes/order.route.ts";
import errorhandler from "./middlewares/error.middleware.ts";

// import MongoStore from "connect-mongo";
// import Session from "express-session";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// app.use(
//   Session({
//     store: new MongoStore({
//       mongoUrl: process.env.MONGO_URI,
//     }),
//     secret: process.env.SECRET_KEY || "your_secret_key",
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//       secure: process.env.NODE_ENV === "production",
//     },
//     resave: false,
//   })
// );

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "backend is up and running",
  });
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});

app.use("/orders", orderRouter);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `${req.originalUrl} route not found`,
  });
});

app.use(errorhandler);
