const mongoose = require("mongoose");
class DataBase {
  constructor() {
    this.connect();
  }
  async connect() {
    try {
      await mongoose.connect("mongodb://127.0.0.1/ExamHallAllocation");
      console.log("DataBase Connected");
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new DataBase();
