const AllocatedModel = require("./Model/AllocatedModel");
class HallDetails {
  static async getHallDetails(req, res) {
    try {
      const hallDetails = await AllocatedModel.find();
      res.json(hallDetails);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  }
  static async gethallStaffDetails(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      const query = {
        $or: [{ "Staff_1.Staffid": id }, { "Staff_2.Staffid": id }],
      };
      const staffdata = await AllocatedModel.findOne(query);
      res.json(staffdata);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  }
}
module.exports = HallDetails;
