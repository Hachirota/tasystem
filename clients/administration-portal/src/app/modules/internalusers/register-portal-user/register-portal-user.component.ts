import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiRequestService } from 'src/app/api-request.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-register-portal-user',
  templateUrl: './register-portal-user.component.html',
  styleUrls: ['./register-portal-user.component.css'],
})
export class RegisterPortalUserComponent implements OnInit {
  portalForm: FormGroup;
  clients: [any];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiRequestService,
    private auth: AuthenticationService
  ) {
    this.portalForm = this.fb.group({
      firstname: '',
      surname: '',
      address1: '',
      address2: '',
      eircode: '',
      password: '',
      confirmpassword: '',
      county: '',
      workphone: '',
      email: '',
      client: '',
    });
  }

  ngOnInit(): void {
    this.apiService
      .getClients()
      .subscribe((clients) => (this.clients = clients));
  }

  submitForm(): void {
    this.auth.registerPortalUser(this.portalForm.value).subscribe();
  }
}
