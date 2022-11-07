interface User {
  FullName: string;
  Username: string;
  password: string;
  Address: string;
  Phone: string;
  DoB: string;
  MedicalInfo_ID: string;
  AuthorizedDoctors: string[];
  Gender: string;
}

export type { User };
