const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const CohortModel = require("./model/CohortModel");
const StudentModel = require("./model/StudentsModel");

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
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ["http://localhost:5173", "http://example.com"],
  })
);
// ...
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
  CohortModel.find()
    .then((cohorts) => res.status(201).json(cohorts))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.post("/api/cohorts", (req, res) => {
  CohortModel.create(req.body)
    .then((createdCohort) => {
      console.log("created cohort", createdCohort);
      res.status(201).json(createdCohort);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const foundCohort = await CohortModel.findById(req.params.cohortId);
    res.status(200).json(foundCohort);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.delete("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  CohortModel.findByIdAndDelete(cohortId)
    .then((deleteCohort) => {
      res.status(200).json(deleteCohort);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await CohortModel.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCohort);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

///////////////////////////////// STUDENTS ROUTES ///////////////////////

app.post("/api/students", async (req, res) => {
  try {
    const createdStudent = await StudentModel.create(req.body);
    res.status(201).json(createdStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const allStudents = await StudentModel.find();
    res.status(200).json(allStudents);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res) => {
  const { cohortId } = req.body;
  try {
    const cohortStudent = await StudentModel.find({ cohortId });

    res.status(200).json(cohortStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/api/students/:studentId", async (req, res) => {
  try {
    const oneStudent = await StudentModel.findById(req.params.studentId);
    res.status(200).json(oneStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const deletedStudent = await StudentModel.findByIdAndDelete(
      req.params.studentId
    );
    res.status(200).json(deletedStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.put("/api/students/:studentId", async (req, res) => {
  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//////////////error handeling thingie/////////

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
