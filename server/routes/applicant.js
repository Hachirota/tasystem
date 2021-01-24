const express = require("express");
const router = express.Router();

const Applicant = require("../models/Applicant");
const gmaps = require("../config/gmapsApi");
const Rater = require("../rater");

const rater = new Rater();

// @desc Get All Applicants
// @route GET /applicant
router.get("/", async (req, res) => {
  try {
    const data = await Applicant.find()
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

// @desc Add applicant(s) to db
// @route POST /applicant
router.post("/", async (req, res) => {
  try {
    let appBody = req.body;

    let address =
      appBody.address1 +
      " " +
      appBody.address2 +
      " " +
      appBody.eircode +
      " " +
      appBody.county +
      " " +
      appBody.country;

    let encAddress = address.replace(/ /g, "%20");

    let gBody = await gmaps.geocode({
      params: { address: encAddress, key: process.env.GOOGLE_MAPS_API_KEY },
    });

    appBody.location = {
      googleplaceid: gBody.data.results[0].place_id,
      geopoint: {
        type: "Point",
        coordinates: [
          gBody.data.results[0].geometry.location.lng,
          gBody.data.results[0].geometry.location.lat,
        ],
      },
    };
    console.log(appBody);
    await Applicant.create(appBody).then((doc) => {
      rater.ApplicantToRequestRater(doc._id);
    });

    res.status(200).send();
  } catch (error) {
    console.error(error);
  }
});

// @desc Get Applicant by ID
// @route GET /applicant/:id

router.get("/:id", async (req, res) => {
  try {
    const data = await Applicant.findById(req.params.id)
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
