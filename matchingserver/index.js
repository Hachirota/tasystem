const algo = require("./src/algorithms/hr-request-optimal");
const Request = require("./src/classes/Request");
const Applicant = require("./src/classes/Applicant");

let applicantsInput = [
  { id: "A", prefs: ["C"] },
  { id: "S", prefs: ["C", "M"] },
  { id: "D", prefs: ["C", "M", "G"] },
  { id: "L", prefs: ["M", "C", "G"] },
  { id: "J", prefs: ["C", "G", "M"] },
];
let requestsInput = [
  { id: "M", numberRequired: 2, prefs: ["D", "L", "S", "J"] },
  { id: "C", numberRequired: 2, prefs: ["D", "A", "S", "L", "J"] },
  { id: "G", numberRequired: 2, prefs: ["D", "J", "L"] },
];

let appArr = [];
let reqArr = [];

applicantsInput.forEach((applicant) => {
  appArr.push(new Applicant(applicant));
});

requestsInput.forEach((request) => {
  reqArr.push(new Request(request));
});

appArr.forEach((applicant) => {
  applicant.preferenceList.forEach((app) => {
    reqArr.forEach((req) => {
      if (app == req.id) {
        applicant.preferenceList[applicant.preferenceList.indexOf(app)] = req;
      }
    });
  });
});

reqArr.forEach((request) => {
  request.preferenceList.forEach((req) => {
    appArr.forEach((app) => {
      if (req == app.id) {
        request.preferenceList[request.preferenceList.indexOf(req)] = app;
      }
    });
  });
});
const test = algo.algorithm(reqArr, appArr);

console.log(test);
