import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css'],
})
export class RequestDetailComponent implements OnInit {
  request = {
    graderequired: 'Executive Officer',
    skillsrequested: [
      {
        skill: 'General Administration',
        required: true,
      },
      {
        skill: 'Customer Service',
        required: false,
      },
    ],
    fulltime: true,
    numberrequired: 2,
    requester: {
      firstname: 'Carl',
      surname: 'Boyle',
      client: 'Health Service Executive',
    },
  };

  ratings = [
    {
      ppsnumber: '1234567W',
      firstname: 'Jane',
      surname: "O'Neill",
      distance: 13.124,
      skillfit: 1,
    },
    {
      ppsnumber: '5667342T',
      firstname: 'Mark',
      surname: 'Smith',
      distance: 8.243,
      skillfit: 0.91,
    },
    {
      ppsnumber: '1234567W',
      firstname: 'Tony',
      surname: 'McCarthy',
      distance: 5.251,
      skillfit: 0.09,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
