interface User {
  id: string;
  fullname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  dob: string;
  medicalInfoID: string;
  authorizedDoctors: string[];
  gender: 'male' | 'female' | 'others';
}

export type { User };
