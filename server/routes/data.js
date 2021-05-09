const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
const Applicant = require("../models/Applicant");
const RequestModel = require("../models/Request");

// @desc Get counts of each status in database
// @route GET /data/admin/applicantsbystatus
router.get("/admin/applicantsbystatus", async (req, res) => {
  data = await Applicant.aggregate([
    // Look up all applicants
    {
      $lookup: {
        from: "clients",
        localField: "employer",
        foreignField: "_id",
        as: "employer",
      },
    },
    // Group them by status and convert to a count
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // Transforms the output into an array and return the array
  // [[status: count]]
  output = [];
  data.forEach((item) => output.push([item._id, item.count]));
  res.status(200).send(output);
});

// @desc Get applicants by status, separated by employer
// @route GET /data/admin/applicantsbyemployer
router.get("/admin/applicantsbyemployer", async (req, res) => {
  // Aggregation pipeline to get applicant stats
  data = await Applicant.aggregate([
    // Lookup all applicants and join with their employer info
    {
      $lookup: {
        from: "clients",
        localField: "employer",
        foreignField: "_id",
        as: "employer",
      },
    },
    // Gets a count of each employer and status
    {
      $group: {
        _id: { employer: "$employer", status: "$status" },
        count: { $sum: 1 },
      },
    },
    // Separate them by employer
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

// @desc Get requests data, separated by status
// @route GET /data/admin/requestsbystatus
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

// @desc Get applicants by status, separated by employer
// @route GET /data/admin/requestsbyapplicants
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

// @desc Get counts of each applicant by status in database for a given employer
// @route GET /data/client/applicantsbystatus/:id
router.get("/client/applicantsbystatus/:id", async (req, res) => {
  data = await Applicant.aggregate([
    {
      $match: {
        employer: mongoose.Types.ObjectId(req.params.id),
      },
    },
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

module.exports = router;
