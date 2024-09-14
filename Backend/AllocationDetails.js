const ExamHallModel = require("./Model/ExamHallModel");
const StaffModel = require("./Model/StaffModel");
const AllocatedModel = require("./Model/AllocatedModel");
const { default: mongoose } = require("mongoose");

class AllocationDetails {
  constructor() {
    AllocationDetails.getModelDetails();
    // AllocationDetails.getstaffDetails();
  }
  static async getModelDetails() {
    const count = await AllocatedModel.countDocuments();
    if (count == 0) {
      //check the allocatedmodel is already assigned or not
      try {
        const examData = await ExamHallModel.find();
        const staffData = await StaffModel.find();
        const ShuffledStaff = AllocationDetails.shuffleArray([...staffData]);
        const AllocatedStaff = [];
        //   Allocate the staff
        for (let i = 0; i < examData.length; i++) {
          const Staff1 = ShuffledStaff.pop();
          const Staff2 = ShuffledStaff.pop();
          AllocatedStaff.push({
            ExamHall: examData[i],
            Allocated: [Staff1, Staff2],
          });
        }
        var sample = {};
        AllocatedStaff.map(async (details) => {
          sample = {
            ExamName: details.ExamHall.ExamName,
            ExamHall: details.ExamHall.ExamHall,
            Session: details.ExamHall.Session,
            Date: details.ExamHall.Date,
            Staff_1: details.Allocated[0],
            Staff_2: details.Allocated[1],
          };

          const allocatedInformation = new AllocatedModel(sample);
          const result = await allocatedInformation.save();
        });
        console.log("Exam Hall allocated");
      } catch (error) {
        console.log("Error in Get Details ", error);
        throw error;
      }
    } else {
      console.log("ExamHall Already Allocated you check the database");
    }
  }
  static shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  static async getstaffDetails() {
    try {
      var date = new Date();
      const monthzero = date.getMonth() < 10 ? "0" : "";
      const zero = date.getHours() < 10 ? "0" : "";
      const FN =
        date.getFullYear() +
        "-" +
        monthzero +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        "T" +
        zero +
        date.getHours() +
        ":00:00.000+00:00";
      const AN =
        date.getFullYear() +
        "-" +
        monthzero +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        "T11:00:00.000+00:00";
      const sessionDate = date.getHours() < 12 ? FN : AN;

      console.log("Today Date and Session", new Date(sessionDate));
      const d = new Date();
      console.log("Today Date and Session", d);
      const nDate = new Date();

      console.log(nDate);
      // const staffData = await StaffModel.find({
      //   $or: [
      //     {
      //       Available_Date1: {
      //         $gte: new Date("2024-04-29T00:00:00.000+00:00"),
      //         $lte: new Date("2024-04-29T00:00:00.000+00:00"),
      //       },
      //     },
      //   ],
      // }).exec(); // Using exec() to return a promise

      // console.log("Staff Details", staffData);
      // Close the connection after all operations are done
      mongoose.connection.close();
    } catch (error) {
      console.log("Error in getStaffDetails", error);
      // Close the connection in case of error too
      mongoose.connection.close();
    }
  }
}
module.exports = new AllocationDetails();
