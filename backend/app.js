import express from "express";
import connectDB from "./db/databse.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import userProfileRouter from "./routes/userProfileRoutes.js";





const app  = express();

dotenv.config();

const PORT = process.env.PORT || 3000

connectDB();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/blog",blogRouter);
app.use("/api/v1/profile",userProfileRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
     res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });

})