const algo = require("../algorithms/hr-request-optimal");
const Request = require("../classes/Request");
const Applicant = require("../classes/Applicant");
const express = require("express");
const router = express.Router();

// let applicantsInput = [
//   { id: "A", prefs: ["C"] },
//   { id: "S", prefs: ["C", "M"] },
//   { id: "D", prefs: ["C", "M", "G"] },
//   { id: "L", prefs: ["M", "C", "G"] },
//   { id: "J", prefs: ["C", "G", "M"] },
// ];
// let requestsInput = [
//   { id: "M", numberRequired: 2, prefs: ["D", "L", "S", "J"] },
//   { id: "C", numberRequired: 2, prefs: ["D", "A", "S", "L", "J"] },
//   { id: "G", numberRequired: 2, prefs: ["D", "J", "L"] },
// ];

// @desc Route for matching algorithm - returns JSON with matching results
// @route POST /matching
router.post("/", (req, res) => {
  let applicants = req.body.applicants;
  let requests = req.body.requests;
  let appArr = [];
  let reqArr = [];

  // Create applicant and request objects for matching algorithm
  applicants.forEach((applicant) => {
    appArr.push(new Applicant(applicant));
  });

  requests.forEach((request) => {
    reqArr.push(new Request(request));
  });

  // Link mutually interested applicants and request objects together by order of preference
  appArr.forEach((applicant) => {
    applicant.preferenceList.forEach((app) => {
      reqArr.forEach((req) => {
        if (app == req.id) {
          applicant.preferenceList[applicant.preferenceList.indexOf(app)] = req;
        }
      });
    });
  });

  reqArr.forEach((request) => {
    request.preferenceList.forEach((req) => {
      appArr.forEach((app) => {
        if (req == app.id) {
          request.preferenceList[request.preferenceList.indexOf(req)] = app;
        }
      });
    });
  });

  // Pass applicants and requests to algorithm
  const output = algo.algorithm(reqArr, appArr);

  // Strip object references from output body to remove circular reference error
  output.forEach((request) => {
    delete request.assignedApplicants;
    delete request.preferenceList;
  });
  return res.status(200).json(output);
});

module.exports = router;
