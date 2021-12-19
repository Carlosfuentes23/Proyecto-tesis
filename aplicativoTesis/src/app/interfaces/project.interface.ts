export type Project ={
  id:string;
  name: string;
  leader_id: string;
  skills: string[];
  description: string;
  members_id: string[];
  phases: string[];
  state: boolean;
  created_at?: Date;
  date_estimated?: number;
  updated_at?: Date;
}
