const OebbAPI = require(`../OebbAPI`)
const { isString } = require('../../utils')

// We have to up jest's timeout as HAFAS might be busy.
jest.setTimeout(10000)

const oebbAPI = new OebbAPI()

describe(`[OebbAPI].isHealthy`, () => {
  it(`initialize() sets this.context`, async () => {
    oebbAPI.initialize({ context: `test` })
    expect(oebbAPI.context).toEqual(`test`)
  })

  it(`isHealthy() returns true`, async () => {
    const healthy = await oebbAPI.isHealthy()
    expect(healthy).toBeTruthy()
  })
})

describe(`[OebbAPI].getLocations`, () => {
  it(`getLocations() returns empty array without name`, async () => {
    const locations = await oebbAPI.getLocations()
    expect(locations).toMatchInlineSnapshot(`Array []`)
  })

  it(`getLocations() returns empty array with empty name`, async () => {
    const name = ``
    const locations = await oebbAPI.getLocations(name)
    expect(locations).toMatchInlineSnapshot(`Array []`)
  })

  it(`getLocations() returns array with name "Wien"`, async () => {
    const name = `Wien`
    const locations = await oebbAPI.getLocations(name)
    expect(locations).toMatchSnapshot()
  })
})

describe(`[OebbAPI].getStopInfo`, () => {
  it(`getStopInfo() returns empty object without id`, async () => {
    const locations = await oebbAPI.getStopInfo()
    expect(locations).toMatchInlineSnapshot(`Object {}`)
  })

  it(`getStopInfo() returns object for id`, async () => {
    const wienHbf = `8101590`
    const locations = await oebbAPI.getStopInfo(wienHbf)
    expect(locations).toMatchSnapshot()
  })
})

describe(`[OebbAPI].getJourneys`, () => {
  it(`getJourneys() returns empty object without from & to`, async () => {
    const locations = await oebbAPI.getJourneys()
    expect(locations).toMatchInlineSnapshot(`Object {}`)
  })

  it(`getJourneys() returns object for from & to`, async () => {
    const fromWienHbf = `8101590`
    const toSalzburgHbf = `8100002`
    const journeys = await oebbAPI.getJourneys(fromWienHbf, toSalzburgHbf)
    expect(journeys).toHaveProperty(`earlierRef`)
    expect(journeys).toHaveProperty(`laterRef`)
    expect(journeys).toHaveProperty(`journeys`)
  })
})

describe(`[OebbAPI].legReducer`, () => {
  const dummyLocation = {
    id: `test`,
    name: `test`,
    type: `test`,
    location: `test`,
    products: `test`,
  }

  const dummyOperator = {
    type: `test`,
    id: `test`,
    name: `test`,
  }

  const dummyLine = {
    type: `test`,
    id: `test`,
    fahrtNr: `test`,
    name: `test`,
    public: `test`,
    mode: `test`,
    product: `test`,
    operator: dummyOperator,
  }

  const dummyLeg = {
    origin: dummyLocation,
    destination: dummyLocation,
    departure: `test`,
    arrival: `test`,
    reachable: `test`,
    tripId: `test`,
    line: dummyLine,
    walking: true,
    distance: 10,
    direction: `test`,
    arrivalPlatform: `test`,
    departurePlatform: `test`,
  }

  it(`legReducer() returns a "reduced" leg`, async () => {
    const leg = oebbAPI.legReducer(dummyLeg)
    expect(leg).toMatchSnapshot()
    delete dummyLeg.line
    const legWithoutLine = oebbAPI.legReducer(dummyLeg)
    expect(legWithoutLine.line).toEqual({})
  })
})

describe(`mocked HAFAS for [OebbAPI].getStopInfo & [OebbAPI].getLocations`, () => {
  beforeEach(() => {
    oebbAPI.hafasClient.locations = jest.fn(async () => {})
    oebbAPI.hafasClient.stop = jest.fn(async () => [])
  })

  it(`getStopInfo() returns empty object`, async () => {
    const wienHbf = `8101590`
    const locations = await oebbAPI.getStopInfo(wienHbf)
    expect(locations).toMatchInlineSnapshot(`Object {}`)
  })

  it(`getStopInfo() returns object for id`, async () => {
    const name = `Wien`
    const stop = await oebbAPI.getLocations(name)
    expect(stop).toMatchInlineSnapshot(`Array []`)
  })
})

describe(`isString() util`, () => {
  it(`isString() returns true for string`, () => {
    const testString = isString(`test`)
    expect(testString).toBeTruthy()
  })

  it(`isString() returns false for non string`, () => {
    const testString = isString({})
    expect(testString).toBeFalsy()
  })
})
