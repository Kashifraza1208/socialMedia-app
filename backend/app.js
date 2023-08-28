const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleWare = require("./middleware/error");
const cookieParser = require("cookie-parser");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
//using Middleware
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());

//Importing routes
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

//using routes
app.use("/api/v1", postRoute);
app.use("/api/v1", userRoute);

//=============================for live api check===============================


//
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


// ================================================================

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.set("trust proxy", 1);

app.use(errorMiddleWare);

module.exports = app;
