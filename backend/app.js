const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleWare = require("./middleware/error");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
app.use(cookieParser());

//using Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

//Importing routes
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

//using routes
app.use(cors());
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
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

app.use(errorMiddleWare);

module.exports = app;
