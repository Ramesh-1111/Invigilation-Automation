const mongoose = require("mongoose");
const StaffSchema = new mongoose.Schema(
  {
    Staffid: { type: Number, required: true, unique: true },
    Details: {
      Name: { type: String, required: true },
      Department: { type: String, required: true },
      Mobile_No: { type: Number, required: true },
      Email: { type: String, required: true },
      Year_Joined: { type: Number, required: true },
    },
    Available_Date1: { type: Date, required: true },
    Available_Date2: { type: Date, required: true },
    Available_Date3: { type: Date, required: true },
  },
  { versionKey: false }
);
const staff_details = "Staff_Deatils";
module.exports = mongoose.model(staff_details, StaffSchema, staff_details);
