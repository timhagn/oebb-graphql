const resolvers = {
  Query: {
    locations: async (_, { name }, { dataSources }) => {
      return await dataSources.oebbAPI.getLocations(name)
    },
  },
}

module.exports = resolvers
