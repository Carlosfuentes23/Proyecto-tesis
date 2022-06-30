export type Abilitie = {
    _id?: string;
    name?: string;
    description?:string
    id_project?:string;
    members?: members;
}

export type members = {
    id_member?: string;   
    name?: string;
    lastname?:string;
    notes?:notes;
}

export type notes = {
    note: number
    date: string
    phaseId: string
}