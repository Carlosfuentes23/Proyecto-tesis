export type Project ={
  _id?:string;
  name?: string;
  leaderid?: string;
  skills?: string[];
  description?: string;
  membersid?: string[];
  organization?: string;
  phases?: string[];
  state?: string;
  created_at?: Date;
  start_date?: Date;
  end_date?: Date;
  updated_at?: Date;
}
