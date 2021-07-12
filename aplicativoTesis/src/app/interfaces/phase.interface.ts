export interface Phase{
  name: string;
  leader: string;
  dateCreate: number;
  dateEstimada: number;
  description: string;
  integrantes: string[]; //Integrantes y Leader hay que cambiar string por Usser
}

