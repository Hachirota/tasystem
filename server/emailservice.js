const nodemailer = require("nodemailer");
const Email = require("email-templates");

const transportconfig = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PW,
  },
});

const emailoptions = new Email({
  message: {
    from: "admin@tempassignments.gov.ie",
  },
  send: true,
  preview: false,
  transport: transportconfig,
});

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

function applicantAssignedEmail() {}

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

function applicantRefusedAssignment() {}

function employeeAssignedEmail() {}

function requestAllocationEmail() {}

module.exports = { applicantValidatedEmail, applicantAcceptedAssignment };
