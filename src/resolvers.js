const { GraphQLDateTime } = require(`graphql-iso-date`)
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashedPassword = bcrypt.hashSync(process.env.PASSWORD, 10)
const defaultUser = process.env.USERNAME
const secret = process.env.SECRET

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    locations: async (_, { name }, { dataSources, user }) => {
      // if (!user) {
      //   throw new Error('Not Authenticated')
      // }
      return await dataSources.oebbAPI.getLocations(name)
    },
    stop: async (_, { id }, { dataSources, user }) => {
      // if (!user) {
      //   throw new Error('Not Authenticated')
      // }
      return await dataSources.oebbAPI.getStopInfo(id)
    },
    journeys: async (_, args, { dataSources, user }) => {
      // if (!user) {
      //   throw new Error('Not Authenticated')
      // }
      const { from, to, ...otherArgs } = args

      return await dataSources.oebbAPI.getJourneys(from, to, otherArgs)
    },
  },
  Mutation: {
    login: async (parent, { username, password }, ctx, info) => {
      if (!username === defaultUser) {
        throw new Error('Invalid Login')
      }

      const passwordMatch = await bcrypt.compare(
        password,
        hashedPassword
      )

      if (!passwordMatch) {
        throw new Error('Invalid Login ' + password)
      }

      const token = jwt.sign(
        {
          id: `12345`,
          username: defaultUser,
        },
        secret,
        {
          expiresIn: '30d', // token will expire in 30days
        }
      )
      return {
        token,
      }
    },
  },
}

module.exports = resolvers
