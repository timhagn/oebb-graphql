const { DataSource } = require('apollo-datasource')
const createClient = require('hafas-client')
const oebbProfile = require('hafas-client/p/oebb')

class OebbAPI extends DataSource {
  constructor() {
    super()
    this.hafasClient = createClient(oebbProfile, 'oebb-test')
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context
  }

  locationReducer(location) {
    return {
      id: location.id,
      name: location.name,
      type: location.type,
      geo: location.location,
      products: location.products,
    }
  }

  async getLocations(name) {
    if (!name) return []
    const locations = await this.hafasClient.locations(name)

    // Transform the raw location to what Location expects.
    return Array.isArray(locations)
      ? locations
          .filter(location => location.name !== ``)
          .map(location => this.locationReducer(location))
      : []
  }

  async isHealthy() {
    const wienWest = '1290401'
    const result = await this.hafasClient.stop(wienWest)
    return result.id === wienWest
  }
}

module.exports = OebbAPI
