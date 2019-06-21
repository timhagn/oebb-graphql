const { gql } = require(`apollo-server-micro`)

const typeDefs = gql`
  scalar DateTime

  type Query {
    locations(name: String!): [Location]
    stop(id: ID!): Location!
    journeys(from: ID!, to: ID!): Journeys
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

  type Journeys {
    earlierRef: String
    laterRef: String  
    journeys: [Journey]
  }
  
  type Journey {
    type: String
    legs: [JourneyLeg]   
    refreshToken: String  
  }
  
  type JourneyLeg {
    origin: Location
    destination: Location
    departure: DateTime
    arrival: DateTime
    reachable: Boolean
    tripId: String
    line: Line
    walking: Boolean
    distance: Int  
    direction: String
    arrivalPlatform: String
    departurePlatform: String  
  }
  
  type Line {
    type: String
    id: ID
    fahrtNr: Int
    name: String
    public: Boolean
    mode: String
    product: String
    operator: Operator
  }
  
  type Operator {
    type: String
    id: ID
    name: String      
  } 
`

module.exports = typeDefs
