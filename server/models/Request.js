const mongoose = require('mongoose')


const RequestSchema = new mongoose.Schema({
    graderequired: String,
    skillsrequired: [{ skill: String, essential: Boolean}],
    fulltime: Boolean,
    numberrequired: Number,
    daterequired: Date},
    { timestamps: true }
)

const Request = mongoose.model('Request', RequestSchema)

module.exports = Request