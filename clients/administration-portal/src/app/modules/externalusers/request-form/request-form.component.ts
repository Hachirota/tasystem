import { Component, Injectable, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiRequestService } from 'src/app/api-request.service';
import { ClientContact } from 'src/app/shared/models/ClientContact';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
})
@Injectable()
export class RequestFormComponent implements OnInit {
  public skills: FormArray;
  public requestForm: FormGroup;
  grades = [
    'Clerical Officer',
    'Executive Officer',
    'Administrative Officer',
    'Higher Executive Officer',
    'Assistant Principal Officer',
    'Principal Officer',
  ];

  requester: ClientContact;

  availableSkills = [];

  constructor(private fb: FormBuilder, private apiService: ApiRequestService) {
    this.requestForm = this.fb.group({
      grade: '',
      numberrequired: '',
      fulltime: '',
      skills: this.fb.array([this.createSkill()]),
    });
  }

  ngOnInit() {
    this.getSkills();
    this.getRequester();
  }

  get skillsControls() {
    return this.requestForm.get('skills')['controls'];
  }

  getSkills() {
    this.apiService
      .getSkills()
      .subscribe((skills) => (this.availableSkills = skills));
  }

  getRequester() {
    this.apiService
      .getClientContact()
      .subscribe((contact) => (this.requester = contact));
  }

  createSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      required: '',
    });
  }

  addSkill(): void {
    this.skills = this.requestForm.get('skills') as FormArray;
    this.skills.push(this.createSkill());
  }

  removeSkill(i: number) {
    this.skills.removeAt(i);
  }

  submitRequest() {
    this.requestForm.value.requester = this.requester._id;
    this.apiService.postRequest(this.requestForm.value).subscribe();
  }
}
