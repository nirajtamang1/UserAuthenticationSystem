import express from "express";
import dotenv from "dotenv";
import router from "./routes/authRoute.js";
import connectDB from "./config/db.js";

// configure dot env file
dotenv.config();

connectDB();

const app = express();

// configure middleware
app.use(express.json());

//routes
app.use("/api/auth", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
