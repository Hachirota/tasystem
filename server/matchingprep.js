// Module to convert the ratings stored into the database into ordered preference lists for each available request and applicant.
// This is to allow for the ratings to be performed in advance of the matching, and then used to create preference lists as required

const Rating = require("./models/Rating");
const Applicant = require("./models/Applicant");
class MatchingPrep {
  constructor() {
    // Applicant ID is stored as a set to ensure ID is recorded only once in cases where the applicant is wanted by multiple requests
    this.ratingsArr = [];
    this.applicantsArr = [];
    this.appIDs = new Set();
    this.requestOutput = [];
    this.applicantOutput = [];
  }
  // Function to query the database for the ratings of all open requests, which it then filters down to the ratings of available applicants.
  async ratingQuery(requests) {
    for (const request of requests) {
      await Rating.find({ request: request._id })
        .populate({
          path: "applicant",
        })
        .then((ratings) => {
          let availableRatings = ratings.filter(
            (rating) => rating.applicant.status == "Validated"
          );
          availableRatings.forEach((rating) => this.ratingsArr.push(rating));
        });
    }

    this.ratingsArr.forEach((rating) =>
      this.appIDs.add(rating.applicant._id.toString())
    );
    await this.applicantQuery(this.appIDs);
  }

  async applicantQuery(applicantIDs) {
    for (const applicantID of applicantIDs) {
      await Applicant.findById(applicantID).then((document) => {
        this.applicantsArr.push(document);
      });
    }
  }

  requestGen(request) {
    let result = {};
    result.id = request._id.toString();
    result.requestId = request.requestID;
    result.numberRequired =
      request.numberrequired - (request.assigned.length || 0);
    result.prefs = [];
    let reqRatings = this.ratingsArr
      .filter((rating) => rating.request.toString() == result.id)
      .sort((a, b) => {
        if (b.matchFit - a.matchFit == 0) {
          return a.distance - b.distance;
        } else {
          return b.matchFit - a.matchFit;
        }
      });
    reqRatings.forEach((rating) =>
      result.prefs.push(rating.applicant._id.toString())
    );
    if (result.prefs.length > 0) {
      this.requestOutput.push(result);
    }
  }

  applicantGen(applicant) {
    let result = {};
    result.id = applicant._id.toString();
    result.prefs = [];
    let appRatings = this.ratingsArr
      .filter((rating) => rating.applicant._id.toString() == result.id)
      .sort((a, b) => {
        if (a.distance - b.distance == 0) {
          return b.matchFit - a.matchFit;
        } else {
          return a.distance - b.distance;
        }
      });
    appRatings.forEach((rating) =>
      result.prefs.push(rating.request._id.toString())
    );
    this.applicantOutput.push(result);
  }

  async matchingPrep(requests) {
    await this.ratingQuery(requests);
    requests.forEach((request) => this.requestGen(request));
    this.applicantsArr.forEach((applicant) => this.applicantGen(applicant));

    let output = {
      applicants: this.applicantOutput,
      requests: this.requestOutput,
    };
    return output;
  }
}

module.exports = MatchingPrep;
