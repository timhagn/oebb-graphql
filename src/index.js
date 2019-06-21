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
const graphqlHandler = cors(apolloServer.createHandler({ path: graphqlPath }))

module.exports = router(
  get('/', cors((req, res) => res.end('Welcome!'))),
  post(graphqlPath, graphqlHandler),
  get(graphqlPath, graphqlHandler)
)
