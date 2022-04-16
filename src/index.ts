const { ApolloServer, gql } = require('apollo-server');
import path from 'path'
import { readFileSync } from 'fs'
import resolvers from './resolvers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: {
    prisma
  }
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }: { url: string }) => {
    console.log(`
      🚀  Server is ready at ${url}
      📭  Query at https://studio.apollographql.com/dev
    `);
  });