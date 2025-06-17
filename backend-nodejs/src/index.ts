import express, { NextFunction, Request, Response } from "express";
import { config } from "./config/app.config";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import connectDatabase from "./config/database.config";
import authRoutes from "./routes/auth.routes";
import { registerValidation } from "./validations/auth.validation";
import isAuthenticated from "./middlewares/auth.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { BadRequestException } from "./utils/appError";
import { ErrorCodeEnum } from "./enums/error-code.enum";
import { HTTPSTATUS } from "./config/http-status.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import passport from "passport";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = config.PORT;
const BASE_URL = config.BASE_URL;
console.log("BASE_URL:", BASE_URL);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [config.FRONTEND_ORIGIN!];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", (req, res) => {
  const origin = req.get("Origin");
  res.setHeader(
    "Access-Control-Allow-Origin",
    origin || config.FRONTEND_ORIGIN!
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(HTTPSTATUS.NO_CONTENT).end(); // 204 No Content is best for preflight
});

app.use(
  session({
    name: "session",
    secret: config.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: config.MONGODB_URI!,
    }),
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // Session expiration time (e.g., 1 day)
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  `/`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException(
      "This is a bad request",
      ErrorCodeEnum.AUTH_INVALID_TOKEN
    );
  })
);

app.use(`${BASE_URL}`, router);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${config.NODE_ENV} mode`);
  await connectDatabase();
});
