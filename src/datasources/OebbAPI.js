const { DataSource } = require('apollo-datasource')
const createClient = require('hafas-client')
const oebbProfile = require('hafas-client/p/oebb')

const { isObject } = require('../utils')

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

  /**
   * Reduces a given location to its GraphQL pendant.
   * @param location  Object  Given location object.
   * @return {{geo: *, name: *, id: *, type: *, products: *}}
   */
  locationReducer(location) {
    return {
      id: location.id,
      name: location.name,
      type: location.type,
      geo: location.location,
      products: location.products,
    }
  }

  /**
   * Queries HAFAS for a given location name.
   * @param name  string
   * @return {Promise<Array>}
   */
  async getLocations(name) {
    if (!name) return []
    const locations = await this.hafasClient.locations(name)

    // Transform the raw location to what Location expects.
    return Array.isArray(locations)
      ? locations.map(location => this.locationReducer(location))
      : []
  }

  /**
   * Queries HAFAS for information about a given location id.
   * @param id  Number  IBNR to display info about.
   * @return {Promise<Object>}
   */
  async getStopInfo(id) {
    if (!id) return {}
    const stop = await this.hafasClient.stop(id)

    // Transform the raw location to what Stop expects.
    return isObject(stop) ? this.locationReducer(stop) : {}
  }

  async isHealthy() {
    const wienWest = '1290401'
    const result = await this.hafasClient.stop(wienWest)
    return result.id === wienWest
  }
}

module.exports = OebbAPI
