const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const compression = require("compression");
const path = require("path");

const AppError = require("./utils/appError");
const errorMiddleware = require("./middlewares/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const projectRoutes = require("./routes/projectRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const taskRoutes=require("./routes/taskRoutes");
const notificationRoutes=require("./routes/notificationsRoutes");

//* Start express app *******************************************************************

const app = express();

//* Middlewares ****************************************************

// Implement cors
app.use(
  cors({
    // origin: "*",
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.6.66:5173",
      "http://192.168.6.65:5173",
      "http://192.168.6.189:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);
app.options("*", cors());

// set security HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Logger for dev
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests
const limiter = rateLimit({
  //TODO change max to 100
  max: 1000,
  windowMs: 30 * 60 * 1000,
  message: new AppError(
    "Too many requests from this IP, please try again in an hour",
    429
  ),
});
app.use("/api", limiter);

// Body parser
app.use(express.json({ limit: "10kb" }));

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent paramater pollution
app.use(hpp());

// compression
app.use(compression());

//* Routes *********************************************************

app.get("/", (req, res) => res.send("Server working!"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/section", sectionRoutes);
app.use("/api/v1/task",taskRoutes);
app.use("/api/v1/notifications",notificationRoutes);

//* Error Middleware ***********************************************

// Route not found
app.all("*", (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} route on this server!`, 404)
  );
});

// Global error handling *********************************************
app.use(errorMiddleware);

module.exports = app;
