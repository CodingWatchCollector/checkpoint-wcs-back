import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { dataSource } from './dataSource'
import { buildSchema } from 'type-graphql'
import { CountryResolver } from './resolvers'

const main = async () => {
  const schema = await buildSchema({
    resolvers: [CountryResolver],
    validate: false
  })

  const server = new ApolloServer({
    schema
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  })

  console.log(`🚀  Server ready at: ${url}`)
  await dataSource.initialize()
  console.log('db initialized')
}

void main()
