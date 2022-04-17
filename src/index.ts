import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import path from 'path'
import { readFileSync } from 'fs'
import resolvers from './resolvers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

!(async function () {
  // Required logic for integrating with Express
  const app = express()
  const httpServer = http.createServer(app)
  // Middlewares
  app.use('/static', express.static(path.join(__dirname, '../public')))

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      prisma,
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  // More required logic for integrating with Express
  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
  })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})()