export type Phase={
  _id?: string;
  name?: string;
  leader_id?: string;
  project_id?: string;
  description?: string;
  members_id?: string[]; //Integrantes y Leader hay que cambiar string por Usser
  skills?: string[];
  state?: string;
  date_estimated?: number;
  created_at?: Date;
  start_date?: Date;
  end_date?: Date;
  updated_at?: Date;
}

