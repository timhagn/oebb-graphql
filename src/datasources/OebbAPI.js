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
   * Queries for stop "Wien Hbf" and returns success or failure.
   * @return {Promise<boolean>}
   */
  async isHealthy() {
    const wienHbf = '1290401'
    const result = await this.getStopInfo(wienHbf)
    return result.id === wienHbf
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
   * Queries HAFAS for information about a given location id.
   * @param from      Number  IBNR to start from.
   * @param to        Number  IBNR to journey to.
   * @param options   Object  Optional options (earlierThan & laterThen).
   * @return {Promise<Object>}
   */
  async getJourneys(from, to, options) {
    if (!from || !to) return {}
    const journeyObject = await this.hafasClient.journeys(from, to, options)

    return this.journeysReducer(journeyObject)
  }

  /**
   * Reduces a given journey object to its GraphQL pendant.
   * @param journeyObject   Object  A HAFAS journey object.
   * @return {{journeys: array, laterRef: *, earlierRef: *}}
   */
  journeysReducer(journeyObject) {
    const journeys = journeyObject.journeys.map(journey =>
      this.journeyReducer(journey)
    )
    return {
      earlierRef: journeyObject.earlierRef,
      laterRef: journeyObject.laterRef,
      journeys,
    }
  }

  /**
   * Reduces an individual journey to its GraphQL pendant.
   * @param journey   Object  Given journey object.
   * @return {{legs: array, type: string, refreshToken: string}}
   */
  journeyReducer(journey) {
    const legs = journey.legs.map(leg => this.legReducer(leg))
    return {
      type: journey.type,
      legs,
      refreshToken: journey.refreshToken,
    }
  }

  /**
   * Reduces a given journey leg to its GraphQL pendant.
   * @param leg   Object  Given journey leg object.
   * @return {{arrival: (*|null), origin: {geo: *, name: *, id: *, type: *, products: *}, destination: {geo: *, name: *, id: *, type: *, products: *}, departure: (*|null)}}
   */
  legReducer(leg) {
    return {
      origin: this.locationReducer(leg.origin),
      destination: this.locationReducer(leg.destination),
      departure: leg.departure,
      arrival: leg.arrival,
      reachable: leg.reachable,
      tripId: leg.tripId,
      line: leg.line ? this.lineReducer(leg.line) : {},
      walking: !!leg.walking,
      distance: leg.walking && leg.distance ? leg.distance : 0,
      direction: leg.direction,
      arrivalPlatform: leg.arrivalPlatform,
      departurePlatform: leg.departurePlatform,
    }
  }

  /**
   * Reduces a given line to its GraphQL pendant.
   * @param line  Object  Given line object.
   * @return {{mode: *, product: (*|string), fahrtNr: *, public: (*|boolean), name: *, id: *, type: *, operator: {name: *, id: *, type: *}}}
   */
  lineReducer(line) {
    return {
      type: line.type,
      id: line.id,
      fahrtNr: line.fahrtNr,
      name: line.name,
      public: line.public,
      mode: line.mode,
      product: line.product,
      operator: this.operatorReducer(line.operator),
    }
  }

  /**
   * Reduces a given operator to its GraphQL pendant.
   * @param operator  Object  Given operator object.
   * @return {{name: *, id: *, type: *}}
   */
  operatorReducer(operator) {
    return {
      type: operator.type,
      id: operator.id,
      name: operator.name,
    }
  }
}

module.exports = OebbAPI
