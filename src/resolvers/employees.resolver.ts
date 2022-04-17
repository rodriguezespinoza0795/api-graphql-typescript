import type { e_employee, PrismaClient } from '@prisma/client'

type ResolverParent = unknown
type ResolverContext = { prisma: PrismaClient}

export function findOne(parent:ResolverParent, arg:{id:string}, context: ResolverContext): Promise<e_employee | null> {
    return context.prisma.e_employee.findUnique(
    {
        where: {
            id_employee: parseInt(arg.id,10)
        }
    })
}

export function findAll(parent:ResolverParent, arg:unknown, context: ResolverContext): Promise<e_employee[]> {
    return context.prisma.e_employee.findMany()
}
