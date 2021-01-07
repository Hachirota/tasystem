const express = require("express");
const router = express.Router();
const gmaps = require("../config/gmapsApi");
const Client = require("../models/Client");
const ClientContact = require("../models/ClientContact");
const RequestModel = require("../models/Request");
const Rater = require("../rater");

const rater = new Rater();

// @desc Current Test Route
// @route GET /client
router.get("/", (req, res) => {
  res.send("Client Route");
  rater.rater();
});

// @desc Get List of Providing Employers for Applicant Form
// @route GET /client/providers
router.get("/providers", async (req, res) => {
  try {
    const data = await Client.find(
      { providingapplicants: true },
      "name"
    ).lean();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
});

// @desc Add client(s) to db
// @route POST /client
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    await Client.create(req.body);
    res.status(200).send("Client Added");
  } catch (error) {
    console.error(error);
  }
});

router.post("/clientcontact", async (req, res) => {
  try {
    console.log(req.body);
    let contactBody = req.body;

    let address =
      contactBody.address1 +
      " " +
      contactBody.address2 +
      " " +
      contactBody.eircode +
      " " +
      contactBody.county +
      " " +
      contactBody.country;

    let encAddress = address.replace(/ /g, "%20");

    let gBody = await gmaps.geocode({
      params: { address: encAddress, key: process.env.GOOGLE_MAPS_API_KEY },
    });

    contactBody.location = {
      googleplaceid: gBody.data.results[0].place_id,
      geopoint: {
        type: "Point",
        coordinates: [
          gBody.data.results[0].geometry.location.lng,
          gBody.data.results[0].geometry.location.lat,
        ],
      },
    };

    await ClientContact.create(contactBody);

    res.status(200).send();
  } catch (error) {
    console.error(error);
  }
});

router.get("/clientcontact", async (req, res) => {
  try {
    const data = await ClientContact.findOne()
      .populate({ path: "client", select: "name" })
      .lean();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
});

router.post("/request", async (req, res) => {
  try {
    await RequestModel.create(req.body);
    console.log(req.body);
    res.status(200).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
