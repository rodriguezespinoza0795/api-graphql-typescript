import type { PAF, PrismaClient } from '@prisma/client'

type ResolverParent = unknown
type ResolverContext = { prisma: PrismaClient}

export function findAll(parent:ResolverParent, arg:unknown, context: ResolverContext): Promise<PAF[]> {
    return context.prisma.pAF.findMany({
        include: { PAFType: true }
    })
}

type createPAFInput = Pick<PAF, 'id_PAFType' | 'status' | 'date_effective' | 'id_registry' | 'id_employee' | 'id_creator' | 'id_creator_pers'>

export function create(parent:unknown, {data}:{ data:createPAFInput}, context: ResolverContext): Promise<PAF> {
    return context.prisma.pAF.create(
    {data :
        {
            ...data,
            date_effective: new Date(data.date_effective),
        }
    })
}