const express = require("express");
const bodyParser = require("body-parser");

//const sequelize = require("./util/database.js");
const fs = require("fs");
const path = require("path");
const { dirname } = require("path");
const { fileURLToPath } = require("url");

//Import model
const {
  sequelize,
  Account,
  AdsPlacement,
  AdsType,
  Area,
  Board,
  BoardType,
  Company,
  LocationType,
  PermitRequest,
  Report,
  ReportType,
} = require("./models");

//Import routes
const citizenRoutes = require("./routes/citizen.js");
const authRoutes = require("./routes/auth.js");

//Variable definition
const PORT = 5000 || process.env.PORT;

const uploadFolder = "images";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const app = express();


//View engine (ejs)
app.set("view engine", "ejs");
app.set("views", "views");

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use("/report", express.static(path.join(__dirname, "images")));
app.use('/images',express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "public")));

console.log(__dirname)

//Routing
app.use("/citizen", citizenRoutes);
app.use("/auth",authRoutes);
app.use("/", (req, res) => {
  res.render("404");
});

app.listen(PORT, async () => {
  console.log("Server is running on PORT ", PORT);
  try {
    await sequelize.sync();
    console.log("Database connected!!");
  } catch(err) {
    console.error(err);
  }

})
