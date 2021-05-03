import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-externalusers',
  templateUrl: './externalusers.component.html',
  styleUrls: ['./externalusers.component.css'],
})
export class ExternalusersComponent implements OnInit {
  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {}
}
