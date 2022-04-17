import type { PAF, PrismaClient } from '@prisma/client'
import { AuthenticationError } from 'apollo-server-express'

export type ResolverParent = unknown
export type ResolverContext = { prisma: PrismaClient, user: Express.User | undefined }

export function findAll(parent:ResolverParent, arg:unknown, context: ResolverContext): Promise<PAF[]> {
    return context.prisma.pAF.findMany({
        include: { PAFType: true }
    })
}

type createPAFInput = Pick<PAF, 'id_PAFType' | 'status' | 'date_effective' | 'id_registry' | 'id_employee' | 'id_creator' | 'id_creator_pers'>

export function create(parent:unknown, {data}:{ data:createPAFInput}, context: ResolverContext): Promise<PAF> {
    if(context.user == undefined){
        throw new AuthenticationError("Unauthenticated request");
    }
    return context.prisma.pAF.create(
    {data :
        {
            ...data,
            date_effective: new Date(data.date_effective),
        }
    })
}