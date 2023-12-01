const express = require("express");
const bodyParser = require("body-parser");
//const sequelize = require("./util/database.js");
const fs = require("fs");
const path = require("path");
const { dirname } = require("path");
const { fileURLToPath } = require("url");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");
const { authUser, authRole } = require("./middlewares/authentication.js");

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
const departmentRoutes = require("./routes/department.js");
const wardDistrictRoutes = require("./routes/ward_district.js");
const account = require("./models/account.js");

// initalize sequelize with session store
const SessionStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SessionStore({
  db: sequelize,
});

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
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    store: sessionStore,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    saveUninitialized: false,
  })
);
app.use(flash());


//Routing
// app.get("/test", (req, res) => {
//   return res.send("Hello");
// })
app.use("/citizen", citizenRoutes);
app.use("/", authRoutes);

app.use(authUser);
app.use("/department", authRole("So"), departmentRoutes);
app.use("/ward", authRole("Phuong"), wardDistrictRoutes);
app.use("/district", authRole("Quan"), wardDistrictRoutes);

app.use((req, res) => {
  res.render("404");
});

app.listen(PORT, async () => {
  console.log("Server is running on PORT ", PORT);
  try {
    await sequelize.authenticate();
    //await sequelize.sync({alter:true});
    console.log("Database connected!!");
    sessionStore.sync();
  } catch (err) {
    console.error(err);
  }
});