const Applicant = require("./models/Applicant");
const RequestModel = require("./models/Request");
const turf = require("@turf/turf");
const ClientContact = require("./models/ClientContact");
const Rating = require("./models/Rating");

//Class to create rating documents assessing the "fit" of an applicant to a request
class Rater {
  // Function to create the rating document
  genRating(request, applicant) {
    // create object containing output
    let results = {
      applicant: applicant._id,
      request: request._id,
      maxScore: 0,
      skillScore: 0,
      matchFit: 0,
      distance: 0,
    };

    // for each skill requested in the request
    // 1. Add a value to the max score for the rating, 100 if essential, 10 if not
    // 2. For each skill the applicant has, if the skill is requested add 100 to the applicants score if essential, 10 if not
    // 3. Calculate the "fit" of the applicant to the request as a percentage of their score to the total
    request.skillsrequested.forEach((skill) => {
      results.maxScore += skill.required === true ? 100 : 10;
      applicant.skills.forEach((appSkill) => {
        if (skill.skill.equals(appSkill._id)) {
          results.skillScore += skill.required === true ? 100 : 10;
        }
      });
      results.matchFit = parseFloat(
        (results.skillScore / results.maxScore).toFixed(2)
      );
    });

    // Obtain the distance in km between the request and the applicant as the crow flies
    results.distance = parseFloat(
      turf
        .distance(
          applicant.location.geopoint.coordinates,
          request.requester.location.geopoint.coordinates
        )
        .toFixed(3)
    );

    // If the % score is greater than 40%, write the rating document to the db
    if (results.matchFit > 0.4) {
      Rating.create(results);
    }
  }

  // Function to commence the rating of an applicant on creation to the requests in the db
  async ApplicantToRequestRater(applicantID) {
    // get applicant from db
    const applicant = await Applicant.findById(applicantID).populate({
      path: "skills",
    });

    // Find all client contacts within 45km of the applicant (as the crow flies) - Division is to convert to radians to allow geoquery
    let contacts = await ClientContact.find({
      "location.geopoint": {
        $geoWithin: {
          $centerSphere: [applicant.location.geopoint.coordinates, 45 / 6378.1],
        },
      },
    });

    // For each contact, query the db for their requests and call the rating function on each
    contacts.forEach(async (contact) => {
      let requests = await RequestModel.find({
        requester: contact._id,
        graderequired: applicant.grade,
        fulltime: applicant.fulltime,
      }).populate({
        path: "requester",
      });
      requests.forEach((request) => {
        this.genRating(request, applicant);
      });
    });
  }

  // Function to commence the rating of a request on creation to the applicants in the db
  async RequestToApplicantRater(requestID) {
    const request = await RequestModel.findById(requestID).populate({
      path: "requester",
    });
    let matches = await Applicant.find({
      "location.geopoint": {
        $geoWithin: {
          $centerSphere: [
            request.requester.location.geopoint.coordinates,
            45 / 6378.1,
          ],
        },
      },
      grade: request.graderequired,
      fulltime: request.fulltime,
    }).populate({ path: "skills" });
    matches.forEach((match) => this.genRating(request, match));
  }
}

module.exports = Rater;
