const ExamModel = require("./Model/ExamHallModel");
const StaffModel = require("./Model/StaffModel");
const AllocatedModel = require("./Model/AllocatedModel");
const allocated = [];
class AllocationDetails {
  async GetDetails() {
    try {
      const ExamHall_Data = await ExamModel.find();
      //   console.log(ExamHall_Data);
      const Staff_Details = await StaffModel.find();
      return { ExamHall_Data, Staff_Details };
      //   console.log(Staff_Details);
    } catch (error) {
      console.log(error);
    }
  }
}
const p = new AllocationDetails();
p.GetDetails().then((details) => {
  // console.log(details.Staff_Details);
  //   console.clear();
  const ShuffleArray = [];
  details.Staff_Details.map((value) => {
    ShuffleArray.push(value);
  });

  for (let i = ShuffleArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ShuffleArray[i], ShuffleArray[j]] = [ShuffleArray[j], ShuffleArray[i]];
  }

  for (let k = 0; k < details.ExamHall_Data.length; k++) {
    allocated.push({
      ExamHall: details.ExamHall_Data[k],
      Allocated: [ShuffleArray.pop(), ShuffleArray.pop()],
    });
  }
  console.log(allocated);

  allocated.map((val) => {
    console.log("ExamHall :", val.ExamHall);
    console.log("Staff Details :");
    val.Allocated.map((det) => {
      console.log(det);
    });
  });
  console.log(ShuffleArray);
  UploadAllocated(allocated);
});
async function UploadAllocated(allocate) {
  try {
    for (information of allocate) {
      //   const uploadallocated = new AllocatedModel(information);
      //   const result = await uploadallocated.save();
      //   allocated.map((val) => {
      //     console.log(val.ExamHall);
      //     val.Allocated.map((det) => {
      //       console.log(det);
      //     });
      //   });
    }
    console.log("ExamHall Allocated succesfully");
  } catch (error) {
    console.log(error);
  }
}
module.exports = AllocationDetails;
