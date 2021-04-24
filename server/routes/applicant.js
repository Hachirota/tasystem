const express = require("express");
const router = express.Router();

const Applicant = require("../models/Applicant");
const gmaps = require("../config/gmapsApi");
const Rater = require("../rater");

const emailservice = require("../emailservice");

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

// @desc Add applicant to db
// @route POST /applicant
router.post("/", async (req, res) => {
  try {
    let appBody = req.body;

    // Prepare address information to send to google geocoding api
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

    // Send to google geocoding service
    let gBody = await gmaps.geocode({
      params: { address: encAddress, key: process.env.GOOGLE_MAPS_API_KEY },
    });

    // If geocoding api returned a valid result, insert it into applicant object
    if (typeof gBody.data.results[0] !== "undefined") {
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

      // Insert applicant into database and perform rating process on requests in database
      await Applicant.create(appBody).then((doc) => {
        rater.ApplicantToRequestRater(doc._id);
      });
      res.status(200).send();
    }
  } catch (error) {
    //console.error(error)
  }
});

// @desc Update an applicant
// @route PUT /applicant/:id

router.put("/:id", async (req, res) => {
  await Applicant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: "true" },
    async (error, applicant) => {
      if (error) return res.status(500).send(error);

      await applicant
        .populate("employer")
        .populate({
          path: "assignment",
          populate: { path: "requester", populate: { path: "client" } },
        })
        .execPopulate();
      // If update was to validate applicant, trigger notification e-mail
      if (req.body.status == "Validated") {
        emailservice.applicantValidatedEmail(
          applicant.firstname,
          applicant.homeemail,
          applicant.employer.name
        );
      }
      if (req.body.status == "Assignment Accepted") {
        emailservice.applicantAcceptedAssignment(
          applicant.firstname,
          applicant.surname,
          applicant.employer.centralcontactname,
          applicant.employer.centralcontactemail,
          applicant.assignment.requester.client.name
        );
      }
      if (req.body.status == "Assignment Refused") {
        emailservice.applicantRefusedAssignment(
          applicant.firstname,
          applicant.surname,
          applicant.employer.centralcontactname,
          applicant.employer.centralcontactemail,
          applicant.assignment.requester.client.name
        );
      }

      return res.status(200).send(applicant);
    }
  );
});

// @desc Get Applicant by ID
// @route GET /applicant/:id

router.get("/:id", async (req, res) => {
  try {
    const data = await Applicant.findById(req.params.id)
      .populate([
        { path: "employer", select: "name" },
        { path: "skills", populate: { path: "skills", select: "name" } },
        { path: "assignment", populate: { path: "requester" } },
      ])
      .lean();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
