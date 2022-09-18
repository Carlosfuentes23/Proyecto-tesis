export type Phase={
  _id?: string;
  name?: string;
  leaderid?: string;
  projectid?: string;
  description?: string;
  membersid?: string[]; //Integrantes y Leader hay que cambiar string por Usser
  abilitiesid?: string[];
  state?: 'ACTIVE' | 'CLOSE';
  date_estimated?: number;
  created_at?: Date;
  start_date?: Date;
  end_date?: Date;
  updated_at?: Date;
}

