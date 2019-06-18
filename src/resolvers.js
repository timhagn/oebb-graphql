const resolvers = {
  Query: {
    locations: async (_, { name }, { dataSources }) => {
      return await dataSources.oebbAPI.getLocations(name)
    },
    stop: async (_, { id }, { dataSources }) => {
      return await dataSources.oebbAPI.getStopInfo(id)
    },
  },
}

module.exports = resolvers
