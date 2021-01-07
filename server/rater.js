const Applicant = require("./models/Applicant");
const RequestModel = require("./models/Request");
const turf = require("@turf/turf");

class Rater {
  async geoQuery(coordinates) {
    const within = await Applicant.find({
      "location.geopoint": {
        $geoWithin: {
          $centerSphere: [coordinates, 45 / 6378.1],
        },
      },
    }).populate({ path: "skills" });
    return within;
  }

  genRating(request, applicant) {
    let results = {
      applicant: applicant._id,
      request: request._id,
      matchFit: 0,
      distance: 0,
    };
    let maxScore = 0;
    let skillScore = 0;

    request.skillsrequested.forEach((skill) => {
      maxScore += skill.required === true ? 100 : 10;
      applicant.skills.forEach((appSkill) => {
        if (skill.skill.equals(appSkill._id)) {
          skillScore += skill.required === true ? 100 : 10;
        }
      });
      results.matchFit = parseFloat((skillScore / maxScore).toFixed(2));
    });

    results.distance = parseFloat(
      turf
        .distance(
          applicant.location.geopoint.coordinates,
          request.requester.location.geopoint.coordinates
        )
        .toFixed(3)
    );

    console.log(maxScore);
    console.log(results);
    console.log(applicant.skills);
  }

  async rater() {
    const data = await RequestModel.findOne().populate({ path: "requester" });
    let matches = await this.geoQuery(
      data.requester.location.geopoint.coordinates
    );

    this.genRating(data, matches[0]);
  }
}

module.exports = Rater;

// 45km = 27.9617 miles
