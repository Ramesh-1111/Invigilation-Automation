const mongoose = require("mongoose");
const ExamHallModel = new mongoose.Schema(
  {
    ExamHall: { type: String, required: true, unique: true },
    ExamName: { type: String, default: "Periodical Exam I" },
    Session: {
      type: String,
      required: true,
    },
    Date: { type: Date, required: true },
  },
  { versionKey: false, timeseries: true }
);
const nameofCollection = "ExamHallDetails";
module.exports = mongoose.model(
  nameofCollection,
  ExamHallModel,
  nameofCollection
);
