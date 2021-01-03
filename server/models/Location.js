const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  googleplaceid: String,
  geopoint: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = { Location, LocationSchema };
