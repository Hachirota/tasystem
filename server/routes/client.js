const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const gmaps = require("../config/gmapsApi");
const Client = require("../models/Client");
const ClientContact = require("../models/ClientContact");
const RequestModel = require("../models/Request");
const Rater = require("../rater");
const MatchingPrep = require("../matchingprep");

const rater = new Rater();

// @desc Route to initiate matching process on matching server
// @route GET /client/matching
router.get("/matching", async (req, res) => {
  let requests = await RequestModel.find({ status: "Open" });

  // Create instance of matching prep class
  let mtchPrep = new MatchingPrep();

  // Create JSON with information to send to matching server and then post it to matching server
  await mtchPrep.matchingPrep(requests).then((output) => {
    axios
      .post("http://localhost:3500/matching", output)
      .then((response) => console.log(response.data));
  });

  res.status(200).send("Client Route");
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
    await Client.create(req.body);
    res.status(200).send("Client Added");
  } catch (error) {
    console.error(error);
  }
});

// @desc Add new client contact to db - HAS NO CLIENT METHOD TO PERFORM THIS ATM
// @route POST /client/clientcontact
router.post("/clientcontact", async (req, res) => {
  try {
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

    res.status(200).send();
  } catch (error) {
    console.error(error);
  }
});

// @desc Retrives a client contact from db - CURRENTLY RETRIEVES A RANDOM ONE
// @route POST /client/clientcontact
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

// @desc Adds a request to the database and then generates ratings for it
// @route POST /client/request
router.post("/request", async (req, res) => {
  try {
    await RequestModel.create(req.body).then((doc) =>
      rater.RequestToApplicantRater(doc._id)
    );
    res.status(200).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
