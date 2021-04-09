const _ = require("lodash");

// Class to represent request player within matching game
class Request {
  assignedApplicantIDs = [];
  assignedApplicants = [];
  constructor(requestObj) {
    this.id = requestObj.id;
    this.requestId = requestObj.requestId;
    this.numberRequired = requestObj.numberRequired;
    this.preferenceList = requestObj.prefs;
    this.originalPrefs = this.preferenceList.slice();
  }

  getFavourite() {
    for (const pref of this.preferenceList) {
      if (!this.assignedApplicants.includes(pref)) {
        return pref;
      }
    }
  }

  unmatch(applicant) {
    this.assignedApplicants.splice(
      this.assignedApplicants.indexOf(applicant),
      1
    );
  }

  forget(applicant) {
    this.preferenceList.splice(this.preferenceList.indexOf(applicant), 1);
  }

  checkAvailable() {
    return (
      this.assignedApplicants.length < this.numberRequired &&
      _.difference(this.preferenceList, this.assignedApplicants).length > 0
    );
  }
}

module.exports = Request;
