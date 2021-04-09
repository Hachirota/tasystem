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
    workemail: { type: String, default: "test@test.com" },
    fulltime: { type: Boolean, default: true },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    location: {
      type: LocationSchema,
    },
    status: { type: String, default: "Unvalidated" },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
  },
  { timestamps: true }
);

const Applicant = mongoose.model("Applicant", ApplicantSchema);

module.exports = Applicant;
