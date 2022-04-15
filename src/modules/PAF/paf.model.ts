export type PAF_TYPE = {
    id: number
    PAFType: string
    PAFType_slug: string
    is_active: boolean
    is_visible: boolean
    order: number
}
  
export type PAF = {
    id_PAF: number
    PAFType: PAF_TYPE
    status: number
    date_effective: Date
    id_registry: number
    id_employee: number
    id_creator: number
    id_creator_pers: number
    id_editor: number
    id_editor_pers: number
    date_created: Date
    date_modified: Date
    date_authorized: Date
    dt_created: Date
    dt_modified: Date
}

export interface CreatePAFDto extends Omit<PAF, 'id_PAF' | 'id_editor' | 'id_editor_pers' | 'date_authorized' | 'PAFType'| 'dt_modified' | 'date_modified'>{
    PAFType: number;
  }