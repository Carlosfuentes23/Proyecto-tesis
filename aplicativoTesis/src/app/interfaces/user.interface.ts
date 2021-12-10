export type user ={
  name?: string;
  email?: string;
  userName?:string;
  telephone?: number;
  password?: string;
  skills?: string[];
}


export type jwtResponse ={
  token: string;
  user: user;
}
