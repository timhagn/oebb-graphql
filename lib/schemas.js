const { gql } = require(`apollo-server-micro`)

const typeDefs = gql`
    type Query {
        sayHello: String
    }
`

module.exports = typeDefs