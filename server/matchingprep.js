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
  // Function to query the database for the ratings of all open requests,
  // which it then filters down to the ratings of available applicants.
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
    // Add the applicant ids found to the applicant id Set
    this.ratingsArr.forEach((rating) =>
      this.appIDs.add(rating.applicant._id.toString())
    );
    // Then for each applicant id, query their info
    await this.applicantQuery(this.appIDs);
  }

  // Function to query all applicants available to be matched to
  async applicantQuery(applicantIDs) {
    for (const applicantID of applicantIDs) {
      await Applicant.findById(applicantID).then((document) => {
        this.applicantsArr.push(document);
      });
    }
  }

  // Function to generate request info for matching
  requestGen(request) {
    // Prepare return object and add database ID, scheme reference and number required in the matching round
    // The number requireed is the number requested - the number currently assigned
    let result = {};
    result.id = request._id.toString();
    result.requestId = request.requestID;
    result.numberRequired =
      request.numberrequired - (request.assigned.length || 0);
    result.prefs = [];
    // Take the ratings in the ratings array that match the request id
    // Then sort the array in order of matchfit % from greatest to least
    // If there is a tie, sort by the distance of the applicants - nearest to furthest
    let reqRatings = this.ratingsArr
      .filter((rating) => rating.request.toString() == result.id)
      .sort((a, b) => {
        if (b.matchFit - a.matchFit == 0) {
          return a.distance - b.distance;
        } else {
          return b.matchFit - a.matchFit;
        }
      });
    // Push the applicant ids of the sorted request array into the preference array
    // This forms the ordered preference list
    reqRatings.forEach((rating) =>
      result.prefs.push(rating.applicant._id.toString())
    );

    // Do not return a request if there are no valid applicants
    if (result.prefs.length > 0) {
      this.requestOutput.push(result);
    }
  }

  // Function to generate applicant info for matching
  applicantGen(applicant) {
    let result = {};
    result.id = applicant._id.toString();
    result.prefs = [];
    // Take the ratings in the ratings array that match the applicant id
    // Then sort by the distance of the requests - nearest to furthest
    // If there is a tie, break the tie by matchfit % from greatest to least
    let appRatings = this.ratingsArr
      .filter((rating) => rating.applicant._id.toString() == result.id)
      .sort((a, b) => {
        if (a.distance - b.distance == 0) {
          return b.matchFit - a.matchFit;
        } else {
          return a.distance - b.distance;
        }
      });
    // Push the request ids of the sorted applicant array into the preference array
    // This forms the ordered preference list
    appRatings.forEach((rating) =>
      result.prefs.push(rating.request._id.toString())
    );
    this.applicantOutput.push(result);
  }

  // Function to prepare for the matching. Is passed an array of open requests
  async matchingPrep(requests) {
    // Query the information of each request
    await this.ratingQuery(requests);
    // Prepare each request - This will also prepare an array of available applicants
    requests.forEach((request) => this.requestGen(request));
    // Prepare each applicant
    this.applicantsArr.forEach((applicant) => this.applicantGen(applicant));

    // Return the results of both generation processes
    let output = {
      applicants: this.applicantOutput,
      requests: this.requestOutput,
    };
    return output;
  }
}

module.exports = MatchingPrep;
