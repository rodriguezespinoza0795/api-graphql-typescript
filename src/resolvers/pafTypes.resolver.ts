import type { PAF_types, PrismaClient } from '@prisma/client'

type ResolverContext = { prisma: PrismaClient}

export function findAll(parent:unknown, arg:unknown, context: ResolverContext): Promise<PAF_types[]> {
    return context.prisma.pAF_types.findMany()
}