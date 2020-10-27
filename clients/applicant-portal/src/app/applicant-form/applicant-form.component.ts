import { Component, Injectable, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ApiRequestService } from "../api-request.service";

@Component({
  selector: "app-applicant-form",
  templateUrl: "./applicant-form.component.html",
  styleUrls: ["./applicant-form.component.css"],
})
@Injectable()
export class ApplicantFormComponent implements OnInit {
  employers = [];
  grades = [
    "Clerical Officer",
    "Executive Officer",
    "Administrative Officer",
    "Higher Executive Officer",
    "Assistant Principal Officer",
    "Principal Officer",
  ];

  availableSkills = [
    "General Administration",
    "Customer Service",
    "Staff Management",
    "Finance",
    "Human Resources",
    "IT",
  ];

  applicantForm = this.fb.group({
    ppsnumber: [],
    firstName: [],
    surname: [],
    address1: [],
    address2: [],
    eircode: [],
    county: [],
    mobile: [],
    homeemail: [],
    employer: [],
    grade: [],
    workemail: [],
    fulltime: [],
    skills: this.fb.array([this.fb.control("")]),
  });

  constructor(private apiService: ApiRequestService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getEmployers();
  }

  getEmployers() {
    this.apiService
      .getEmployers()
      .subscribe((employers) => (this.employers = employers));
  }

  get skills() {
    return this.applicantForm.get("skills") as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control(""));
  }

  onSubmit() {
    this.applicantForm.value.fulltime =
      this.applicantForm.value.fulltime === "true" ? true : false;
    console.log(this.applicantForm.value);
    this.apiService.postApplicant(this.applicantForm.value).subscribe();
  }
}
