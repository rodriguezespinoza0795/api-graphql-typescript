import { PAF, PAF_TYPE, CreatePAFDto } from './paf.model'

const PAFs: PAF[] = [
  {
    id_PAF: 1,
    PAFType: {
        id: 1,
        PAFType: 'Promotion',
        PAFType_slug: 'Promotion',
        is_active: true,
        is_visible: true,
        order: 1
    },
    status: 1,
    date_effective: new Date(),
    id_registry: 108294,
    id_employee: 108294,
    id_creator: 108294,
    id_creator_pers: 108294,
    id_editor: 108294,
    id_editor_pers: 108294,
    date_created: new Date(),
    date_modified: new Date(),
    date_authorized: new Date(),
    dt_created: new Date(),
    dt_modified: new Date(),
  },
]

const PAFTypes: PAF_TYPE[] = [
    {
        id: 1,
        PAFType: 'Promotion',
        PAFType_slug: 'Promotion',
        is_active: true,
        is_visible: true,
        order: 1
    },
    {
        id: 2,
        PAFType: 'Supervisor',
        PAFType_slug: 'Supervisor',
        is_active: true,
        is_visible: true,
        order: 2
    },
  ]

export function getALLPAFs(): PAF[] {
    return PAFs
}

export function getAllPAFTypes(): PAF_TYPE[] {
    return PAFTypes
}

export function createPAF(data:CreatePAFDto): PAF {
    const currentLength = PAFs.length
    const newPAF: PAF =   {
            id_PAF: currentLength+1,
            PAFType: {
                id: 1,
                PAFType: 'Promotion',
                PAFType_slug: 'Promotion',
                is_active: true,
                is_visible: true,
                order: 1
            },
            status: 1,
            date_effective: new Date(),
            id_registry: 108294,
            id_employee: 108294,
            id_creator: 108294,
            id_creator_pers: 108294,
            id_editor: 108294,
            id_editor_pers: 108294,
            date_created: new Date(),
            date_modified: new Date(),
            date_authorized: new Date(),
            dt_created: new Date(),
            dt_modified: new Date(),
        }

  PAFs.push(newPAF)
  return newPAF
}
