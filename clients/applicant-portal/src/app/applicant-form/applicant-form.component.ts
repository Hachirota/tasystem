import { Component, Injectable, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiRequestService } from '../api-request.service';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['./applicant-form.component.css'],
})
@Injectable()
export class ApplicantFormComponent implements OnInit {
  employers = [];
  grades = [
    'Clerical Officer',
    'Executive Officer',
    'Administrative Officer',
    'Higher Executive Officer',
    'Assistant Principal Officer',
    'Principal Officer',
  ];

  availableSkills = [];

  applicantForm = this.fb.group({
    ppsnumber: ['', Validators.required],
    firstName: ['', Validators.required],
    surname: ['', Validators.required],
    address1: ['', Validators.required],
    address2: [''],
    eircode: ['', Validators.required],
    county: ['', Validators.required],
    country: ['Ireland'],
    mobile: ['', Validators.required],
    homeemail: ['', [Validators.required, Validators.email]],
    employer: ['', Validators.required],
    grade: ['', Validators.required],
    workemail: ['', Validators.required],
    fulltime: ['', Validators.required],
    skills: this.fb.array([this.fb.control('', Validators.required)]),
  });

  constructor(private apiService: ApiRequestService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getEmployers();
    this.getSkills();
  }

  getEmployers() {
    this.apiService
      .getEmployers()
      .subscribe((employers) => (this.employers = employers));
  }

  getSkills() {
    this.apiService
      .getSkills()
      .subscribe((skills) => (this.availableSkills = skills));
  }

  get ppsnumber() {
    return this.applicantForm.get('ppsnumber');
  }

  get skills() {
    return this.applicantForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  onSubmit() {
    this.applicantForm.value.fulltime =
      this.applicantForm.value.fulltime === 'true' ? true : false;
    console.log(this.applicantForm.value);
    this.apiService.postApplicant(this.applicantForm.value).subscribe();
  }
}
