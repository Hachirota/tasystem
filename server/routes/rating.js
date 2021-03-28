const express = require("express");
const router = express.Router();
const Rating = require("../models/Rating");

// @desc Route to get validated and unvalidated ratings for a given request
// @route GET /rating/request/:id
router.get("/request/:id", async (req, res) => {
  requestID = req.params.id;
  try {
    ratings = await Rating.find({ request: requestID }).populate({
      path: "applicant",
      select: "ppsnumber firstname surname status",
    });

    ratings.sort((a, b) => b.matchFit - a.matchFit || a.distance - b.distance);

    validatedApplicants = ratings.filter((rating) => {
      return rating.applicant.status == "Validated";
    });
    unvalidatedApplicants = ratings.filter((rating) => {
      return rating.applicant.status == "Unvalidated";
    });
    res.status(200).send({ validatedApplicants, unvalidatedApplicants });
  } catch (error) {
    console.error(error);
  }
});

router.get("/applicant/:id", async (req, res) => {
  applicantID = req.params.id;
  try {
    ratings = await Rating.find({ applicant: applicantID }).populate({
      path: "request",
      select: "status skillsrequested requester requestID",
      populate: {
        path: "requester",
        populate: { path: "client", select: "name" },
      },
    });
    ratings.sort((a, b) => b.matchFit - a.matchFit);
    openRequests = ratings.filter((rating) => {
      return rating.request.status == "Open";
    });
    res.status(200).send(openRequests);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
