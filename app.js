const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
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
//const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 5000 || process.env.PORT;

const uploadFolder = "images";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "reports");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        "-" +
        file.originalname.replace(" ", "-")
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

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

//Association
/* Area.hasMany(AdsPlacement);
AdsPlacement.belongsTo(Area);

LocationType.hasMany(AdsPlacement);
AdsPlacement.belongsTo(LocationType);

AdsType.hasMany(AdsPlacement);
AdsPlacement.belongsTo(AdsType);

Report.belongsTo(Account);

BoardType.hasMany(Board);
Board.belongsTo(BoardType);

AdsPlacement.hasMany(Board);
Board.belongsTo(AdsPlacement);

Board.hasMany(Report);
Report.belongsTo(Board, { foreignKey: { allowNull: true } });

AdsPlacement.hasMany(Report);
Report.belongsTo(AdsPlacement, { foreignKey: { allowNull: true } });

ReportType.hasMany(Report);
Report.belongsTo(ReportType);

PermitRequest.belongsTo(AdsPlacement);
PermitRequest.belongsTo(Board);
Board.hasOne(PermitRequest);

Company.hasMany(PermitRequest);
PermitRequest.belongsTo(Company); */

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("files", 2)
);
app.use(express.json());
app.use("/report", express.static(path.join(__dirname, "report")));
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
    await sequelize.authenticate();
    console.log("Database connected!!");
  } catch(err) {
    console.error(err);
  }

})
