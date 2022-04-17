import * as paf from './paf.resolver'
import * as pafTypes from './pafTypes.resolver'
import * as e_employee from './employees.resolver'

export default {
  Query: {
    getAllPAFTypes: pafTypes.findAll,
    getAllPAFs: paf.findAll,
    getAllEmployees: e_employee.findAll,
    getEmployee: e_employee.findOne,
  },
  Mutation: {
    createPAF: paf.create,
  },
}