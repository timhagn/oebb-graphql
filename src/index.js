const cors = require(`micro-cors`)()
const { router, get, post, options } = require('microrouter')
const { ApolloServer } = require(`apollo-server-micro`)
const OebbAPI = require(`./datasources/OebbAPI`)

const dataSources = () => ({
  oebbAPI: new OebbAPI(),
})

const typeDefs = require(`./schemas`)
const resolvers = require(`./resolvers`)

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
})

const graphqlPath = '/graphql'
const graphqlHandler = apolloServer.createHandler({ path: graphqlPath })

module.exports = cors(router(
  get('/', (req, res) => 'Welcome!'),
  post(graphqlPath, graphqlHandler),
  get(graphqlPath, graphqlHandler),
))
