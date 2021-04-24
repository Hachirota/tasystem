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

  applicantForm = this.fb.group({
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

  onSubmit() {
    this.applicantForm.value.fulltime =
      this.applicantForm.value.fulltime === 'true' ? true : false;
    console.log(this.applicantForm.value);
    this.apiService.postApplicant(this.applicantForm.value).subscribe();
    this.router.navigateByUrl('/registrationcomplete');
  }
}
