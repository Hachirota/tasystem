// Class to represent applicant player within matching game
class Applicant {
  constructor(applicantObj) {
    this.id = applicantObj.id;
    this.preferenceList = applicantObj.prefs;
    this.match = null;
  }

  // Returns all elements in the preference array after their matched pref
  getSuccessors() {
    let index = this.preferenceList.indexOf(this.match);
    return this.preferenceList.slice(index + 1);
  }

  // Removes their current match
  unmatch() {
    this.match = null;
  }

  // Deletes a preference
  forget(request) {
    this.preferenceList.splice(this.preferenceList.indexOf(request), 1);
  }
}

module.exports = Applicant;
