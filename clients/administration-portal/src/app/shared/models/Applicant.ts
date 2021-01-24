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
  createdAt: string;
  updatedAt: string;
  __v: number;
}
