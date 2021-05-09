const express = require("express");
const router = express.Router();
const gmaps = require("../config/gmapsApi");
const ClientContact = require("../models/ClientContact");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const RSA_PRIVATE_KEY = process.env.SECRET_KEY;

// @desc Add new portal User to DB and create Client Contact entry
// @route POST /user
router.post("/", async (req, res) => {
  try {
    let userBody = req.body;

    let address =
      userBody.address1 +
      " " +
      userBody.address2 +
      " " +
      userBody.eircode +
      " " +
      userBody.county +
      +"Ireland";

    let encAddress = address.replace(/ /g, "%20");

    let gBody = await gmaps.geocode({
      params: { address: encAddress, key: process.env.GOOGLE_MAPS_API_KEY },
    });

    if (typeof gBody.data.results[0] !== "undefined") {
      userBody.location = {
        googleplaceid: gBody.data.results[0].place_id,
        geopoint: {
          type: "Point",
          coordinates: [
            gBody.data.results[0].geometry.location.lng,
            gBody.data.results[0].geometry.location.lat,
          ],
        },
      };

      await ClientContact.create(userBody).then(
        (document) => (userBody.dbID = document._id)
      );
      await User.create(userBody);
      res.status(200).send();
    } else {
      res.status(400).json({ error: "Unable to geocode address" });
    }
  } catch (error) {
    console.error(error);
  }
});

// @desc Process login request from front-end
// @route POST /user/login
router.post("/login", async (req, res) => {
  // Take login info from request body
  const { email, password } = req.body;

  // Find user by e-mail provided
  User.findOne({ email }, async (err, user) => {
    if (err) {
      return res.status(422).json({ error: "Something went wrong!" });
    }
    // If no user found, return failure message
    if (!user) {
      return res.status(422).json({ error: "Invalid User" });
    }
    // If user found:
    // Check if the submitted password matches the password in db
    if (user.hasSamePassword(password)) {
      // If it does, get user's details from client contact collection
      let userInfo = await ClientContact.findById(user.dbID).populate("client");
      // Create the jwt body from details
      let tokenBody = {
        userID: user._id,
        firstname: userInfo.firstname,
        surname: userInfo.surname,
        client: userInfo.client.name,
        dbID: userInfo._id,
        clientID: userInfo.client._id,
        provider: userInfo.client.providingapplicants,
        requester: userInfo.client.requestingapplicants,
      };
      // Sign the token with private key and set expiry time
      jsonToken = jwt.sign(tokenBody, RSA_PRIVATE_KEY, { expiresIn: "1h" });
      //Return token
      return res.json(jsonToken);
    } else {
      // If password doesn't match, return error
      return res.status(422).json({ error: "Invalid e-mail or password" });
    }
  });
});

module.exports = router;
