const createClient = require('hafas-client')
const oebbProfile = require('hafas-client/p/oebb')
const hafasClient = createClient(oebbProfile, 'oebb-test')

const resolvers = {
  Query: {
    sayHello(parent, args, context) {
      return 'Hello World!'
    },
  },
}

module.exports = resolvers