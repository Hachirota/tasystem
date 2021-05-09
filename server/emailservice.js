const nodemailer = require("nodemailer");
const Email = require("email-templates");

//Email transport settings
const transportconfig = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PW,
  },
});

// E-mail options
const emailoptions = new Email({
  message: {
    from: "admin@tempassignments.gov.ie",
  },
  send: true,
  preview: false,
  transport: transportconfig,
});

// Send e-mail on validation
function applicantValidatedEmail(name, email, employer) {
  emailoptions
    .send({
      template: "validated",
      message: {
        to: email,
      },
      locals: {
        name: name,
        employer: employer,
      },
    })
    .catch(console.error);
}

// Send e-mail on assignment
function applicantAssignedEmail(
  appfirstname,
  appsurname,
  appemail,
  employeremail,
  requesterfirstname,
  requestersurname,
  requesteradd1,
  requesteradd2,
  requestereircode,
  requestercounty,
  requesterworkphone,
  requesteremail,
  requesterclient
) {
  emailoptions.send({
    template: "applicantassigned",
    message: {
      to: appemail,
      cc: employeremail,
    },
    locals: {
      applicantfirstname: appfirstname,
      applicantsurname: appsurname,
      requesterfirstname: requesterfirstname,
      requestersurname: requestersurname,
      requesteradd1: requesteradd1,
      requesteradd2: requesteradd2,
      requestereircode: requestereircode,
      requestercounty: requestercounty,
      requesterworkphone: requesterworkphone,
      requesteremail: requesteremail,
      client: requesterclient,
    },
  });
}

// Send e-mail on allocation of applicant to request
function requestAllocationEmail(
  requesterfirstname,
  requestersurname,
  requesteremail,
  appfirstname,
  appsurname,
  appemail,
  appphone,
  requestid
) {
  emailoptions.send({
    template: "requestallocation",
    message: {
      to: requesteremail,
    },
    locals: {
      requesterfirstname: requesterfirstname,
      requestersurname: requestersurname,
      applicantfirstname: appfirstname,
      applicantsurname: appsurname,
      applicantemail: appemail,
      applicantphone: appphone,
      requestid: requestid,
    },
  });
}

// Send e-mail when applicant accepts assignment
function applicantAcceptedAssignment(
  applicantfirstname,
  applicantsurname,
  employerfirstname,
  employeremail,
  client
) {
  emailoptions
    .send({
      template: "appacceptass",
      message: {
        to: employeremail,
      },
      locals: {
        applicantfirstname: applicantfirstname,
        applicantsurname: applicantsurname,
        employername: employerfirstname,
        employeremail: employeremail,
        client: client,
      },
    })
    .catch(console.error);
}

// Send e-mail when applicant refuses assignment
function applicantRefusedAssignment(
  applicantfirstname,
  applicantsurname,
  employerfirstname,
  employeremail,
  client
) {
  emailoptions
    .send({
      template: "apprefusedass",
      message: {
        to: employeremail,
      },
      locals: {
        applicantfirstname: applicantfirstname,
        applicantsurname: applicantsurname,
        employername: employerfirstname,
        employeremail: employeremail,
        client: client,
      },
    })
    .catch(console.error);
}

module.exports = {
  applicantValidatedEmail,
  applicantAcceptedAssignment,
  applicantRefusedAssignment,
  applicantAssignedEmail,
  requestAllocationEmail,
};
