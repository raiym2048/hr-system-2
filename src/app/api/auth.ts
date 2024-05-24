export interface loginData {
  email: "string";
  password: "string";
}

export interface jobData {
  firstname: "string";
  lastname: "string";
  email: "string";
  password: "string";
}

export interface employerData {
  companyName: "string";
  email: "string";
  password: "string";
}

export interface employer {
  user: {
    id: 0;
    firstname: "string";
    lastname: "string";
    email: "string";
    role: "ADMIN";
  };
  access_token: "string";
  refresh_token: "string";
}

export interface job {
  user: {
    id: 0;
    firstname: "string";
    lastname: "string";
    email: "string";
    role: "ADMIN";
  };
  access_token: "string";
  refresh_token: "string";
}
