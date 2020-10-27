const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    name: String,
    providingapplicants: Boolean,
    requestingapplicants: Boolean,
    centralcontactname: String,
    centralcontacttel: String,
    centralcontactemail: String,
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
