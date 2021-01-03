const mongoose = require("mongoose");
const LocationSchema = require("./Location");

const ApplicantSchema = new mongoose.Schema(
  {
    ppsnumber: String,
    firstname: String,
    surname: String,
    address1: String,
    address2: String,
    eircode: String,
    county: String,
    mobile: String,
    homeemail: String,
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    grade: String,
    workemail: String,
    fulltime: Boolean,
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    location: {
      type: LocationSchema,
    },
    status: { type: String, default: "Unvalidated" },
  },
  { timestamps: true }
);

const Applicant = mongoose.model("Applicant", ApplicantSchema);

module.exports = Applicant;
