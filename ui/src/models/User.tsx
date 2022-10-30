interface User {
  id: number;
  entityCode: number;
  fullname: string;
  username: string;
  password: string;
  mail: string;
  gender: 'male' | 'female' | 'others';
}

export type { User };
