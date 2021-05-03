const _ = require("lodash");

// Class to represent request within matching process
class Request {
  // assignedApplicantIDs is to store just the db ID of each applicant for return to the app server
  // This is to work around being unable to send json's containing circular references
  assignedApplicantIDs = [];
  assignedApplicants = [];
  constructor(requestObj) {
    this.id = requestObj.id;
    this.requestId = requestObj.requestId;
    this.numberRequired = requestObj.numberRequired;
    this.preferenceList = requestObj.prefs;
    this.originalPrefs = this.preferenceList.slice();
  }

  // Get their most preferred applicant they aren't already matched to
  getFavourite() {
    for (const pref of this.preferenceList) {
      if (!this.assignedApplicants.includes(pref)) {
        return pref;
      }
    }
  }

  // Function to unpair a request to applicant match
  unmatch(applicant) {
    this.assignedApplicants.splice(
      this.assignedApplicants.indexOf(applicant),
      1
    );
  }

  // Function to delete a applicant from a requests preference list
  forget(applicant) {
    this.preferenceList.splice(this.preferenceList.indexOf(applicant), 1);
  }

  // Checks if a request still has possible matches remaining within the pool
  // Performs a set difference operation between its preference list and their assigned applicants
  checkAvailable() {
    return (
      this.assignedApplicants.length < this.numberRequired &&
      _.difference(this.preferenceList, this.assignedApplicants).length > 0
    );
  }
}

module.exports = Request;
