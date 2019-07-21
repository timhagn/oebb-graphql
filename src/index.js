const cors = require(`micro-cors`)()
const { router, get, post, options } = require('microrouter')
const { ApolloServer } = require(`apollo-server-micro`)
const jwt = require('jsonwebtoken')
const OebbAPI = require(`./datasources/OebbAPI`)

require('dotenv').config()

const getUser = token => {
  const secret = process.env.SECRET
  try {
    if (token) {
      return jwt.verify(token, secret)
    }
    return null
  } catch (err) {
    return null
  }
}

const dataSources = () => ({
  oebbAPI: new OebbAPI(),
})

const typeDefs = require(`./schemas`)
const resolvers = require(`./resolvers`)

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    const user = getUser(token)

    return {
      user,
    }
  },
})

const graphqlPath = '/graphql'
const graphqlHandler = cors(apolloServer.createHandler({ path: graphqlPath }))

module.exports = router(
  get('/', cors((req, res) => res.end('Welcome!'))),
  post(graphqlPath, graphqlHandler),
  get(graphqlPath, graphqlHandler)
)
