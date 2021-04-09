const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const RequestSchema = new mongoose.Schema(
  {
    graderequired: String,
    requestId: Number,
    skillsrequested: [
      {
        skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
        required: Boolean,
      },
    ],
    fulltime: Boolean,
    status: { type: String, default: "Open" },
    numberrequired: Number,
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "ClientContact" },
    assigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Applicant" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

RequestSchema.plugin(AutoIncrement, { inc_field: "requestID" });

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
