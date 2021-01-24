const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "Applicant" },
    request: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
    maxScore: Number,
    skillScore: Number,
    matchFit: Number,
    distance: Number,
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
