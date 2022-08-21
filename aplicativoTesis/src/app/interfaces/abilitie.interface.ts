export type Abilitie = {
    _id?: string;
    name?: string;
    description?:string
    id_project?:string;
    state?: 'ACTIVE' | 'INACTIVE';
    members?: members[];
    created_at?: string;
}

export type members = {
    id_member?: string;
    name?: string;
    lastname?:string;
    notes?:notes;
    state?: 'ACTIVE' | 'INACTIVE';
    activeInPoject?: boolean;
}

export type notes = {
    note: number
    date: string
    phaseId: string
}
