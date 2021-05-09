const express = require("express");
const router = express.Router();

const Applicant = require("../models/Applicant");

// @desc Route to get applicants by a client - used for external user moduel
// @route GET /staff/:clientid
router.get("/:employer", async (req, res) => {
  try {
    const data = await Applicant.find({ employer: req.params.employer })
      .populate([
        { path: "employer", select: "name" },
        { path: "skills", populate: { path: "skills", select: "name" } },
      ])
      .lean();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
