const Applicant = require("./models/Applicant");
const RequestModel = require("./models/Request");
const turf = require("@turf/turf");
const ClientContact = require("./models/ClientContact");
const Rating = require("./models/Rating");

class Rater {
  genRating(request, applicant) {
    let results = {
      applicant: applicant._id,
      request: request._id,
      maxScore: 0,
      skillScore: 0,
      matchFit: 0,
      distance: 0,
    };

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

    results.distance = parseFloat(
      turf
        .distance(
          applicant.location.geopoint.coordinates,
          request.requester.location.geopoint.coordinates
        )
        .toFixed(3)
    );

    if (results.matchFit > 0.4) {
      Rating.create(results);
    }
  }

  async ApplicantToRequestRater(applicantID) {
    const applicant = await Applicant.findById(applicantID).populate({
      path: "skills",
    });

    let contacts = await ClientContact.find({
      "location.geopoint": {
        $geoWithin: {
          $centerSphere: [applicant.location.geopoint.coordinates, 45 / 6378.1],
        },
      },
    });

    contacts.forEach(async (contact) => {
      let requests = await RequestModel.find({
        requester: contact._id,
      }).populate({
        path: "requester",
      });
      requests.forEach((request) => {
        this.genRating(request, applicant);
      });
    });
  }

  async RequestToApplicantRater(requestID) {
    const data = await RequestModel.findById(requestID).populate({
      path: "requester",
    });
    let matches = await Applicant.find({
      "location.geopoint": {
        $geoWithin: {
          $centerSphere: [
            data.requester.location.geopoint.coordinates,
            45 / 6378.1,
          ],
        },
      },
    }).populate({ path: "skills" });
    matches.forEach((match) => this.genRating(data, match));
  }
}

module.exports = Rater;
