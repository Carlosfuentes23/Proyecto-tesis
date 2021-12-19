export type user ={
  id?: string,
  name?: string;
  email?: string;
  telephone?: string;
  password?: string;
  skills?: string[];
  projects_id: string[];
  created_at?: Date;
  updated_at?: Date;
}


export type jwtResponse ={
  token: string;
  user: user;
}
