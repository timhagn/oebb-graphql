const { gql } = require(`apollo-server-micro`)

const typeDefs = gql`
  type Query {
      locations(name: String!): [Location] 
  }

  type Location {
      id: ID!
      type: String!
      name: String!  
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
`

module.exports = typeDefs