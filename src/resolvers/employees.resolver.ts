import type { e_employee, Prisma, PrismaClient } from '@prisma/client'

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

export function findAll(parent:ResolverParent, arg:{skip:number, take:number, where: Prisma.e_employeeWhereInput }, context: ResolverContext): Promise<e_employee[]> {
    return context.prisma.e_employee.findMany({
        skip:arg.skip,
        take:arg.take,
        where: arg.where
    })
}
