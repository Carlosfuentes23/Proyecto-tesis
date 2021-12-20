export type Phase={
  id?: string;
  name?: string;
  leader_id?: string;
  project_id?: string;
  description?: string;
  members_id?: string[]; //Integrantes y Leader hay que cambiar string por Usser
  skills?: string[];
  state?: boolean;
  date_estimated?: number;
  created_at?: Date;
  updated_at?: Date;
}

