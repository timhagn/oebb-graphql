const cors = require(`micro-cors`)()
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
module.exports = cors(apolloServer.createHandler())
