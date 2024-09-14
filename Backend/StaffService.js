const Staff_Data = require("./Model/StaffModel");
class StaffService {
  static async CreateStaff(req, res) {
    try {
      const Details = req.body;
      console.log(Details);
      for (const StaffInformation of Details) {
        const newStaff = new Staff_Data(StaffInformation);
        const result = await newStaff.save();
      }

      res.json({ message: "Staff details created successfully!" });
    } catch (error) {
      console.log("Error While Creating Staff Details" + error);
      res.status(500).json({ message: "Error creating staff details" });
    }
  }
}

module.exports = StaffService;
