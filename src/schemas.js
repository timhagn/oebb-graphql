const { gql } = require(`apollo-server-micro`)

const typeDefs = gql`
  scalar DateTime

  type Query {
    locations(name: String!): [Location]
    stop(id: ID!): Location!
    journeys(from: ID!, to: ID!): [Journey]
  }

  type Location {
    id: ID
    type: String
    name: String
    products: Products
    geo: GeoLocation
  }

  type GeoLocation {
    type: String
    id: ID
    latitude: Float
    longitude: Float
  }

  type Products {
    nationalExpress: Boolean!
    national: Boolean!
    interregional: Boolean!
    regional: Boolean!
    suburban: Boolean!
    bus: Boolean!
    ferry: Boolean!
    subway: Boolean!
    tram: Boolean!
    onCall: Boolean!
  }

  type Journey {
    origin: Location
    destination: Location
    departure: DateTime
    arrival: DateTime
  }
`

module.exports = typeDefs
