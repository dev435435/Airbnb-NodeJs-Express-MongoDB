//Core Module
const path = require("path");

//External Module
const express = require("express");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const DB_PATH = "mongodb+srv://USERNAME:PASSWORD@cluster0.craillb.mongodb.net/?appName=Cluster0";
const multer = require("multer");
const { mongoose } = require("mongoose");

//Local module
const rootDir = require("./utils/pathUtils");
const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const errorsController = require("./Controller/errors");
const authRouter = require("./routes/authRouter");
const app = express();




app.set("view engine", "ejs");
app.set("views", "views");
const store = new mongoDbStore({
  uri: DB_PATH,
  collection: "Sessions",
});

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = {
  storage, fileFilter
};

app.use(express.urlencoded());
app.use(multer(multerOptions).single("Photo"));
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);
app.use(errorsController.pageNotFound);

const PORT = 3001;
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("connected to mongo");

    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("couldn't connect to mongo", err);
  });
