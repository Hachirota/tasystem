const mongoose = require('mongoose')

const ApplicantSchema = new mongoose.Schema({
ppsnumber: String,
firstname: String,
surname: String,
address1: String,
address2: String,
eircode: String,
county: String,
mobile: String,
homeemail: String,
employer: String,
grade: String,
workemail: String,
skills: [{ skill: String }],
status: { type: String, default: "Unvalidated" },
applicationdate: { type: Date, default: Date.now }
})

const Applicant = mongoose.model('Applicant', ApplicantSchema)

module.exports = Applicant 