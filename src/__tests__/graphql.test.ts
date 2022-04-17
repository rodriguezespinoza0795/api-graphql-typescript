import path from 'path'
import { readFileSync } from 'fs'
import { PrismaClient, User, PAF, PAF_types, e_employee } from '@prisma/client'
import { mockDeep } from 'jest-mock-extended'
import { DeepMockProxy } from 'jest-mock-extended'
import gql from 'graphql-tag'
import EasyGraphQLTester from 'easygraphql-tester'

import { ResolverContext } from '../resolvers/paf.resolver'
import resolvers from '../resolvers'

const schema = readFileSync(path.join(__dirname, '../schema.graphql'), 'utf8')

const tester = new EasyGraphQLTester(schema, resolvers)

export type MockResolverContext = {
  prisma: DeepMockProxy<PrismaClient>
  user: User | undefined
}
export const createMockContext = (): MockResolverContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
    user: undefined,
  }
}

let mockContext: MockResolverContext
let context: ResolverContext

beforeEach(() => {
  mockContext = createMockContext()
  context = mockContext as unknown as ResolverContext
})


const mockPAFDB: (PAF & {PAFType : PAF_types})[] = [
    {
        date_effective: new Date(),
        id_PAF: 191088,
        id_PAFType: 6,
        PAFType: {
            id_PAFType: 6,
            PAFType: "LOB",
            PAFType_slug: "lob",
            is_active: 1,
            is_visible: 1,
            order: 2
          },
        status: 1,
        id_registry: 108294,
        id_employee: 108294,
        id_creator: 108294,
        id_creator_pers: 108294,
        id_editor: 0,
        id_editor_pers: 0,
        date_created: new Date(),
        date_modified: new Date(),
        date_authorized: null,
        dt_created: new Date(),
        dt_modified: new Date()
      },
]

const mockEmployeeDB: e_employee = 
    {
        id_employee: 100000,
        id_registry: 1000018,
        id_position: 3,
        id_organizationGroupRegion: 1,
        firstName: "Karla",
        middleName: "",
        lastName: "Gonzalez",
        secondLastName: "",
        shortName: "Karla Gonzalez",
        fullName: "Karla Gonzalez",
        nickname: "",
        RFC: "555555555",
        CURP: "SECUSER",
        IMSS: "123456",
        civilStatus: "2",
        nationality: "1",
        phone: "14043536",
        birthday: null,
        id_gender: 0,
        bloodtype: "2",
        is_rehired: false,
        date_rehired: null,
        is_referred: false,
        date_referred: null,
        is_rep: false,
        id_referredBy: 0,
        is_trainee: false,
        is_newbie: false,
        is_manager: true,
        is_readyToTransfer: false,
        is_propensityToLeave: false,
        is_active: true,
        date_modified: new Date(),
        date_created: new Date(),
        id_editor_pers: 0,
        id_editor: 0,
        id_creator_pers: 1,
        id_creator: 1,
        id_unit_paf: 0,
        id_unit: 0,
        id_hierarchy: 1000,
        id_organizationGroup: 1,
        id_organization: 1,
        city: "1",
        country: "1",
        state: "19",
        address: "None ",
        zip_code: "",
        cellphone: "14043536",
        mail: "",
        path_image: "https://www.beliveo.net/library/team/photos/100000.png",
        id_outsource: 3,
        id_firstGeneration: 0,
        id_currentGeneration: 0,
        id_lob: 0,
        id_department: 1,
        id_area: 0,
        id_group: null,
        id_supervisor: 0,
        id_qa_supervisor: 0,
        id_ods: 0,
        id_coach_support: 0,
        id_paytype: 1,
        weeklyHours: 45,
        id_site: 1,
        date_lwd: null,
        date_hire: new Date()
    }

test('should return a list of PAFs', async () => {
  mockContext.prisma.pAF.findMany.mockResolvedValue(mockPAFDB)

  const query = gql`
    {
        getAllPAFs {
            id_PAF
            PAFType {
                id_PAFType
            }
            status
      }
    }
  `

  const result = await tester.graphql(query, undefined, context)
  expect(mockContext.prisma.pAF.findMany).toHaveBeenCalledTimes(1)
  expect(result.data).toEqual({
    getAllPAFs: [
      {
        id_PAF: "191088",
        PAFType: {
            id_PAFType: "6"
        },
        status: 1,
      },
    ],
  })
  expect(mockContext.prisma.pAF.findMany).toHaveBeenCalledWith({
    include: { PAFType: true },
    where: undefined,
    take: undefined,
    skip: undefined,
  })
})

test('should filter a Employee', async () => {
  mockContext.prisma.e_employee.findUnique.mockResolvedValue(mockEmployeeDB)

  const query = gql`
    {
        getEmployee(id:"100000") {
            id_employee
            shortName
      }
    }
  `

  const result = await tester.graphql(query, undefined, context)
  expect(result.data).toEqual({
    getEmployee: {
      id_employee: "100000",
      shortName: "Karla Gonzalez"
    }
  })
  expect(mockContext.prisma.e_employee.findUnique).toHaveBeenCalledTimes(1)
  expect(mockContext.prisma.e_employee.findUnique).toHaveBeenCalledWith({
    include: undefined,
    where: { id_employee: 100000 },
    take: undefined,
    skip: undefined,
  })
})