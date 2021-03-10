const express = require("express");
const router = express.Router();
const Rating = require("../models/Rating");

router.get("/request/:id", async (req, res) => {
  requestID = req.params.id;
  try {
    ratings = await Rating.find({ request: requestID }).populate({
      path: "applicant",
      select: "ppsnumber firstname surname status",
    });
    validatedApplicants = ratings.filter((rating) => {
      return rating.applicant.status == "Validated";
    });
    res.status(200).send(validatedApplicants);
  } catch (error) {
    console.error(error);
  }
});

router.get("/applicant/:id", async (req, res) => {
  applicantID = req.params.id;
  try {
    ratings = await Rating.find({ applicant: applicantID }).populate({
      path: "request",
      select: "status skillsrequested requester",
      populate: {
        path: "requester",
        populate: { path: "client", select: "name" },
      },
    });
    openRequests = ratings.filter((rating) => {
      return rating.request.status == "Open";
    });
    res.status(200).send(openRequests);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
