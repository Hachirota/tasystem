export interface Applicant {
  _id: string;
  ppsnumber: string;
  firstname: string;
  surname: string;
  address1: string;
  address2: string;
  eircode: string;
  county: string;
  mobile: string;
  homeemail: string;
  employer: {
    _id: string;
    name: string;
  };
  grade: string;
  workemail: string;
  fulltime: boolean;
  skills: [{ _id: string; name: string; __v: number }];
  location: {
    googleplaceid: string;
    geopoint: { type: string; coordinates: [number, number] };
  };
  place_id: string;
  status: string;
  assignment: {
    _id: string;
    status: string;
    assigned: [string];
    graderequired: string;
    numberrequired: Number;
    fulltime: boolean;
    skillsrequested: [{ _id: string; name: string; __v: number }];
    requester: {
      _id: String;
      firstname: String;
      surname: String;
      address1: String;
      address2: String;
      eircode: String;
      county: String;
      client: {
        _id: String;
        name: String;
      };
      mobile: String;
      email: String;
      location: {
        googleplaceid: String;
        geopoint: {
          type: String;
          coordinates: [Number];
        };
      };
      createdAt: String;
      updatedAt: String;
      __v: Number;
    };
    createdAt: String;
    updatedAt: String;
    __v: Number;
    requestID: Number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
