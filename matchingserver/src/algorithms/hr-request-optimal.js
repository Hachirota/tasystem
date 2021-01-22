//Request optimal solving of the Hospital Residents problem

class HRRequestOptimal {
  algorithm(requests) {
    let returnReq = requests;
    // Copy request list
    let freeRequests = returnReq.slice();

    // While there is an element in the free requests array
    while (freeRequests.length) {
      // Take a request from free requests array
      let request = freeRequests.pop();

      // Get the requests most prefered applicant
      let applicant = request.getFavourite();
      // If the applicant is already matched
      if (applicant.match !== null) {
        // Take applicant's current match
        let currentMatch = applicant.match;

        // Unmatch the applicant and the current match
        this.unmatchPair(applicant, currentMatch);

        // If the current match is not in the free requests array, insert it
        if (!freeRequests.includes(currentMatch)) {
          freeRequests.push(currentMatch);
        }
      }

      // Match the applicant and the request
      this.matchPair(applicant, request);

      // If the request still has an open slot, reinsert it into the free requests array
      if (request.checkAvailable()) {
        freeRequests.push(request);
      }

      // Get the all preferences in the applicant's list AFTER the index of the request they were just assigned to
      // i.e. less preferable to the request they were just assigned to
      let successors = applicant.getSuccessors();

      // For each successor delete the pairing between the applicant and the successor from both their lists
      successors.forEach((successor) => {
        this.deletePair(applicant, successor);

        // If the successor now no longer has anyone to be matched to and they are in the free requests array, remove them from it
        if (!successor.checkAvailable() && freeRequests.includes(successor)) {
          freeRequests.splice(freeRequests.indexOf(successor), 1);
        }
      });
    }

    return returnReq;
  }

  matchPair(applicant, request) {
    applicant.match = request;
    request.assignedApplicants.push(applicant);
    request.assignedApplicants.sort((a, b) => {
      request.preferenceList.indexOf(a) - request.preferenceList.indexOf(b);
    });
  }

  unmatchPair(applicant, request) {
    applicant.unmatch();
    request.unmatch(applicant);
  }

  deletePair(applicant, request) {
    applicant.forget(request);
    request.forget(applicant);
  }
}

module.exports = new HRRequestOptimal();

// BREAK TIES BEFORE SENDING TO ALGO
