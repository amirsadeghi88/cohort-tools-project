const { Schema, model } = require("mongoose");

const studentsSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  projects: [String],
  cohort: {
    type: Schema.Types.ObjectId,
    ref: "cohort",
  },
});

const StudentModel = model("student", studentsSchema);
module.exports = StudentModel;
