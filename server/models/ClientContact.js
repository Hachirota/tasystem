const mongoose = require("mongoose");
const LocationSchema = require("./Location");

const ClientContactSchema = new mongoose.Schema(
  {
    firstname: String,
    surname: String,
    address1: String,
    address2: String,
    eircode: String,
    county: String,
    mobile: String,
    email: String,
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    location: {
      type: LocationSchema,
    },
  },
  { timestamps: true }
);

const ClientContact = mongoose.model("ClientContact", ClientContactSchema);

module.exports = ClientContact;
