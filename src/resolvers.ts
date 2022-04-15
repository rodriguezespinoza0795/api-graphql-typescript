import * as db from './modules/PAF/paf.resolver'

export default {
  Query: {
    getAllPAFTypes: db.getAllPAFTypes,
    getALLPAFs: db.getALLPAFs,
  },
  Mutation: {
    createPAF: db.createPAF,
  },
}