import type { PAF_types, PAF, PrismaClient } from '@prisma/client'

type ResolverParent = unknown
type ResolverContext = { prisma: PrismaClient}

export function getALLPAFs(parent:ResolverParent, arg:unknown, context: ResolverContext): Promise<PAF[]> {
    return context.prisma.pAF.findMany({
        include: { Type: true }
    })
}

type createPAFInput = Pick<PAF, 'PAFType' | 'status' | 'date_effective' | 'id_registry' | 'id_employee' | 'id_creator' | 'id_creator_pers'>

export function getAllPAFTypes(parent:unknown, arg:unknown, context: ResolverContext): Promise<PAF_types[]> {
    return context.prisma.pAF_types.findMany()
}

export function createPAF(parent:unknown, {data}:{ data:createPAFInput}, context: ResolverContext): Promise<PAF> {
    return context.prisma.pAF.create(
    {data :
        {
            ...data,
            date_effective: new Date(data.date_effective),
        }
    })
}