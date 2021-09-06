export interface Phase{
  name?: string;
  leader?: string;
  dateCreate?: number;
  dateEstimated?: number;
  description?: string;
  members?: string[]; //Integrantes y Leader hay que cambiar string por Usser
  skills?: string[];
}

