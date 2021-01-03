export interface ClientContact {
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
}
