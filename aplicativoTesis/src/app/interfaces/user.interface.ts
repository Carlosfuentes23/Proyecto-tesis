export type User ={
  _id?: string,
  name?: string;
  last_name?: string;
  email?: string;
  telephone?: string;
  password?: string;
  skills?: string[];
  projects?: string[];
  created_at?: Date;
  start_date?: Date;
  end_date?: Date;
  updated_at?: Date;
}


export type jwtResponse ={
  token: string;
  user: User;
}
