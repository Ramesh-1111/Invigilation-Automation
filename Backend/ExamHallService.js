const ExamHallModel = require("./Model/ExamHallModel");

class ExamHallInformation {
  static async createExamHall(req, res) {
    try {
      const ExamHallData = req.body;
      for (const HallDetails of ExamHallData) {
        const SessionValue = ExamHallInformation.AllocateSession(
          HallDetails.Date
        );
        const HallInformation = { ...HallDetails, Session: SessionValue };
        const ExamHall = new ExamHallModel(HallInformation);
        const HallAllocation = await ExamHall.save();
      }
      res.json({ message: "ExamHall Details Inserted Succesfully" });
    } catch (error) {
      console.log("Error While Inserting Information" + error);
      res.status(500).json({ message: "Error Check Your Code" });
    }
  }
  static AllocateSession(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const Hour = dateTime.getHours();
    if (Hour < 12) return "ForeNoon";
    else return "AfterNoon";
  }
}
module.exports = ExamHallInformation;
