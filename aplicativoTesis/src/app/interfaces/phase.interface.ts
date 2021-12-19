export type Phase={
  id?: string;
  name?: string;
  project_id?: string;
  description?: string;
  members_id?: string[]; //Integrantes y Leader hay que cambiar string por Usser
  skills?: string[];
  state: boolean;
  created_at?: Date;
  date_estimated?: number;
  updated_at?: Date;
}

