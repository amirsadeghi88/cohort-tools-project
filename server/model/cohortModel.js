const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CohortSchema = new Schema({
  inProgress: Boolean,
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: Date,
  endDate: Date,
  programManager: String,
  leadTeacher: String,
  totalHours: Number,
});

const CohortModel = mongoose.model("cohort", CohortSchema);

module.exports = CohortModel;
