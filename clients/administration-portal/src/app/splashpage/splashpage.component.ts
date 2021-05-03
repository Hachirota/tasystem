import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-splashpage',
  templateUrl: './splashpage.component.html',
  styleUrls: ['./splashpage.component.css'],
})
export class SplashpageComponent implements OnInit {
  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {}
}
