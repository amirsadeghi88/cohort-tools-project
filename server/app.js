const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohortsData = require("./data/cohorts.json");
const studentsData = require("./data/students.json");
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:

// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  // res.sendFile(__dirname + "/data/cohorts.json");
  cohortModel
    .find()
    .then((cohorts) => res.json(cohorts))
    .catch((err) => console.log(err));
});

app.get("/api/students", (req, res) => {
  // res.sendFile(__dirname + "/data/students.json");
  studentModel
    .find()
    .then((students) => res.json(students))
    .catch((err) => console.log(err));
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
