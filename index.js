const cors = require('micro-cors')()
const { ApolloServer } = require('apollo-server-micro')

const typeDefs = require(`./lib/schemas`)
const resolvers = require(`./lib/resolvers`)

const apolloServer = new ApolloServer({ typeDefs, resolvers });
module.exports = cors(apolloServer.createHandler());