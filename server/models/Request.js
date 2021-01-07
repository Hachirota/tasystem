const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    graderequired: String,
    skillsrequested: [
      {
        skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
        required: Boolean,
      },
    ],
    fulltime: Boolean,
    numberrequired: Number,
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "ClientContact" },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
