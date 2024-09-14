const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const staff = require("./Model/StaffModel");

const database = require("./DataBase/connect");

const router = require("./router");
const port = 3000;
app.get("/", (req, res) => {
  res.send("InVIGILATION AUTOMATION");
});
// Enable cross-origin resource sharing
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200"); // Replace with your frontend domain
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
const Allocate = require("./AllocationDetails");

app.use("/Api", router);
app.listen(port, () => console.log(`Port Running on ${port}`));
app.post("/login", (req, res) => {
  res.redirect("http://localhost:4200/home");
});
app.get("/find/:id", async (req, res) => {
  const id = req.params.id;
  const data = await staff.find(
    { Staffid: id },
    { Details: { Department: "CSE" } }
  );
  res.json(data);
});
