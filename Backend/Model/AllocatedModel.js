const mongoose = require("mongoose");
const date = new Date();
const day = date.getDate();
const Month = date.getMonth() + 1;
const Year = date.getFullYear();
const session = date.getHours() < 12 ? "FN" : "AN";
const collectionName = `${day}-${Month}-${Year} ${session}`;
const allocationSchema = new mongoose.Schema(
  {
    ExamHall: { type: String, required: true, unique: true },
    ExamName: { type: String, required: true },
    Session: { type: String, required: true },
    Date: { type: Date, required: true },
    Staff_1: {
      Details: {
        Name: { type: String, required: true },
        Department: { type: String, required: true },
        Mobile_No: { type: Number, required: true },
        Email: { type: String, required: true },
        Year_Joined: { type: Number, required: true },
      },
      _id: mongoose.Schema.Types.ObjectId,
      Staffid: { type: Number, required: true, unique: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
    Staff_2: {
      Details: {
        Name: { type: String, required: true },
        Department: { type: String, required: true },
        Mobile_No: { type: Number, required: true },
        Email: { type: String, required: true },
        Year_Joined: { type: Number, required: true },
      },
      _id: mongoose.Schema.Types.ObjectId,
      Staffid: { type: Number, required: true, unique: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  },
  { versionKey: false }
);

const Allocation = mongoose.model(
  collectionName,
  allocationSchema,
  collectionName
);

module.exports = Allocation;
