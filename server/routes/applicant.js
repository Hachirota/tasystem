const express = require("express");
const router = express.Router();

const Applicant = require("../models/Applicant");
const gmaps = require("../config/gmapsApi");

// @desc Get All Applicants
// @route GET /applicant
router.get("/", async (req, res) => {
  try {
    const data = await Applicant.find().populate("employer", "name");

    console.log(data);
    res.status(200).send();
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

    let id = await gmaps.geocode({
      params: { address: encAddress, key: process.env.GOOGLE_MAPS_API_KEY },
    });

    appBody.place_id = id.data.results[0].place_id;

    await Applicant.create(req.body);

    res.status(200).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
