const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const gmaps = require("../config/gmapsApi");
const Client = require("../models/Client");
const ClientContact = require("../models/ClientContact");
const RequestModel = require("../models/Request");
const Rater = require("../rater");
const MatchingPrep = require("../matchingprep");
const Ratings = require("../models/Rating");
const Applicant = require("../models/Applicant");
var mongoose = require("mongoose");
const rater = new Rater();

// @desc Route to initiate matching process on matching server
// @route GET /client/matching
router.get("/matching", async (req, res) => {
  let requests = await RequestModel.find({ status: "Open" });
  // Create instance of matching prep class
  let mtchPrep = new MatchingPrep();

  // Create JSON with information to send to matching server, post it to matching server, and return to client the matching outcome
  await mtchPrep.matchingPrep(requests).then((output) => {
    if (output.requests.length == 0) {
      res
        .status(422)
        .json({ error: "No requests with applicants available to match." });
    } else {
      axios
        .post("http://localhost:3500/matching", output)

        // Update database with matching results
        .then(function (response) {
          response.data.forEach((request) => {
            let applicants = [];
            request.assignedApplicantIDs.forEach((applicant) =>
              applicants.push(mongoose.Types.ObjectId(applicant))
            );
            RequestModel.findByIdAndUpdate(
              request.id,
              {
                $addToSet: { assigned: applicants },
              },
              { new: "true" },
              (error, document) => {
                if (error) {
                  res
                    .status(400)
                    .json({ error: "A server error was encountered." });
                }
                if (document.numberrequired == document.assigned.length) {
                  document.status = "Closed";
                  document.save();
                }
              }
            );
            applicants.forEach((applicant) => {
              Applicant.findById(applicant).then((document) => {
                document.status = "Assigned";
                document.assignment = request.id;
                document.save();
              });
            });
          });
          res.status(200).send(response.data);
        });
    }
  });
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

// @desc Get List of all Clients
// @route GET /client
router.get("/", async (req, res) => {
  try {
    const data = await Client.find({}, "name").lean();
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

// @desc Add new client contact to db - NO LONGER NEEDED?
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

// @desc Retrives a client contact from db - CURRENTLY RETRIEVES A RANDOM ONE - NEED TO UPDATE REQUEST FORM
// @route GET /client/clientcontact
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

router.get("/openrequests", async (req, res) => {
  try {
    data = await Ratings.aggregate([
      {
        $lookup: {
          from: "applicants",
          localField: "applicant",
          foreignField: "_id",
          as: "applicant",
        },
      },
      { $match: { "applicant.status": "Validated" } },
      {
        $lookup: {
          from: "requests",
          localField: "request",
          foreignField: "_id",
          as: "request",
        },
      },
      { $match: { "request.status": "Open" } },
    ]);

    res.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
});

// @desc Get All Requests - For Internal Module
// @route GET /client/request
router.get("/request", async (req, res) => {
  try {
    const data = await RequestModel.find().populate({
      path: "requester",
      populate: { path: "client" },
    });

    res.status(200).send(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
});

// @desc Get A Request via ID
// @route GET /client/request/:id
router.get("/request/:id", async (req, res) => {
  try {
    const data = await RequestModel.findById(req.params.id)
      .populate({ path: "requester", populate: { path: "client" } })
      .populate({ path: "skillsrequested.skill" })
      .populate({
        path: "assigned",
        populate: [
          {
            path: "employer",
          },
          { path: "skills", select: "name" },
        ],
      });

    res.status(200).send(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
