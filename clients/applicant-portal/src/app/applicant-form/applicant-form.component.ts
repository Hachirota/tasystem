import { Component, Injectable, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  skillsTouched = false;

  // Create Angular FormBuilder group
  applicantForm = this.fb.group({
    // Add fields, and validators used to control input
    ppsnumber: ['', Validators.required],
    firstname: ['', Validators.required],
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
    workemail: ['', [Validators.required, Validators.email]],
    fulltime: ['', Validators.required],
    skills: this.fb.array([], Validators.required),
  });

  constructor(
    private apiService: ApiRequestService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  // On component instantiation, call API getters
  ngOnInit(): void {
    this.getEmployers();
    this.getSkills();
  }

  // Functions to get information using API service
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

  // Getters for form fields, used in validators
  get ppsnumber() {
    return this.applicantForm.get('ppsnumber');
  }

  get firstname() {
    return this.applicantForm.get('firstname');
  }

  get surname() {
    return this.applicantForm.get('surname');
  }

  get address1() {
    return this.applicantForm.get('address1');
  }
  get eircode() {
    return this.applicantForm.get('eircode');
  }
  get county() {
    return this.applicantForm.get('county');
  }
  get mobile() {
    return this.applicantForm.get('mobile');
  }
  get homeemail() {
    return this.applicantForm.get('homeemail');
  }
  get employer() {
    return this.applicantForm.get('employer');
  }
  get grade() {
    return this.applicantForm.get('grade');
  }
  get workemail() {
    return this.applicantForm.get('workemail');
  }
  get fulltime() {
    return this.applicantForm.get('fulltime');
  }

  // Function to add or remove skills based on checkbox selection
  onCheckboxChange(e) {
    this.skillsTouched = true;
    const checkArray: FormArray = this.applicantForm.get('skills') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  // Function called on form submission to post applicant data to server
  onSubmit() {
    this.applicantForm.value.fulltime =
      this.applicantForm.value.fulltime === 'true' ? true : false;
    console.log(this.applicantForm.value);
    this.apiService.postApplicant(this.applicantForm.value).subscribe();
    this.router.navigateByUrl('/registrationcomplete');
  }
}
