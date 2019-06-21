const OebbAPI = require(`../OebbAPI`)

// We have to up jest's timeout as HAFAS might be busy.
jest.setTimeout(10000)

const oebbAPI = new OebbAPI()

describe(`[OebbAPI].isHealthy`, () => {
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
