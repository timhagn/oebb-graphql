const { GraphQLDateTime } = require(`graphql-iso-date`)

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    locations: async (_, { name }, { dataSources }) => {
      return await dataSources.oebbAPI.getLocations(name)
    },
    stop: async (_, { id }, { dataSources }) => {
      return await dataSources.oebbAPI.getStopInfo(id)
    },
    journeys: async (_, args, { dataSources }) => {
      const { from, to, ...otherArgs } = args

      return await dataSources.oebbAPI.getJourneys(from, to, otherArgs)
    },
  },
}

module.exports = resolvers
