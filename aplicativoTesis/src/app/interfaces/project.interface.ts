export type Project ={
  _id?:string;
  name?: string;
  leaderid?: string;
  skills?: string[];
  description?: string;
  membersid?: string[];
  organization?: string;
  phases?: string[];
  state?: boolean;
  date_estimated?: string;
  created_at?: Date;
  updated_at?: Date;
}
