export type User ={
  id?: string,
  name?: string;
  last_name?: string;
  email?: string;
  telephone?: string;
  password?: string;
  skills?: string[];
  projects?: string[];
  created_at?: Date;
  updated_at?: Date;
}


export type jwtResponse ={
  token: string;
  user: User;
}
