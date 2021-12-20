export type Project ={
  id?:string;
  name: string;
  leader_id: string;
  skills: string[];
  description: string;
  members_id: string[];
  phases: string[];
  state: boolean;
  date_estimated: number;
  created_at?: Date;
  updated_at?: Date;
}
