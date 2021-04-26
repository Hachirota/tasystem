const express = require("express");
const router = express.Router();

const Applicant = require("../models/Applicant");
const RequestModel = require("../models/Request");

router.get("/admin/applicantsbystatus", async (req, res) => {
  data = await Applicant.aggregate([
    {
      $lookup: {
        from: "clients",
        localField: "employer",
        foreignField: "_id",
        as: "employer",
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  output = [];
  data.forEach((item) => output.push([item._id, item.count]));
  res.status(200).send(output);
});

router.get("/admin/applicantsbyemployer", async (req, res) => {
  data = await Applicant.aggregate([
    {
      $lookup: {
        from: "clients",
        localField: "employer",
        foreignField: "_id",
        as: "employer",
      },
    },
    {
      $group: {
        _id: { employer: "$employer", status: "$status" },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: { status: "$_id.employer" },
        status: { $addToSet: { status: "$_id.status", sum: "$count" } },
      },
    },
  ]);

  output = {};
  data.forEach((item) => {
    employer = item._id.status[0].name;
    employees = [];
    item.status.forEach((status) =>
      employees.push([status.status, status.sum])
    );
    output[employer] = employees;
  });

  res.status(200).send(output);
});

router.get("/admin/requestsbystatus", async (req, res) => {
  data = await RequestModel.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  output = [];
  data.forEach((item) => output.push([item._id, item.count]));
  res.status(200).send(output);
});

router.get("/admin/requestsbyapplicants", async (req, res) => {
  numberRequested = await RequestModel.aggregate([
    {
      $group: {
        _id: null,
        numberrequested: { $sum: "$numberrequired" },
      },
    },
  ]);
  numberAssigned = await RequestModel.aggregate([
    {
      $group: {
        _id: null,
        numberassigned: { $sum: { $size: "$assigned" } },
      },
    },
  ]);

  output = [];
  output.push(["Requested", numberRequested[0].numberrequested]);
  output.push(["Assigned", numberAssigned[0].numberassigned]);
  output.push([
    "Remaining",
    numberRequested[0].numberrequested - numberAssigned[0].numberassigned,
  ]);

  res.status(200).send(output);
});

module.exports = router;
