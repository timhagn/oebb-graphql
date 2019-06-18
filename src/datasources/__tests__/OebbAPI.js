const OebbAPI = require(`../OebbAPI`)

const oebbAPI = new OebbAPI()

describe('[OebbAPI].isHealthy', () => {
  it('isHealthy() returns true', async () => {
    const healthy = await oebbAPI.isHealthy()
    expect(healthy).toBeTruthy()
  })
})

describe('[OebbAPI].getLocations', () => {
  it('getLocations() returns empty array without name', async () => {
    const locations = await oebbAPI.getLocations()
    expect(locations).toMatchInlineSnapshot(`Array []`)
  })

  it('getLocations() returns empty array with empty name', async () => {
    const name = ``
    const locations = await oebbAPI.getLocations(name)
    expect(locations).toMatchInlineSnapshot(`Array []`)
  })

  it('getLocations() returns array with name "Wien"', async () => {
    const name = `Wien`
    const locations = await oebbAPI.getLocations(name)
    expect(locations).toMatchSnapshot()
  })
})

describe('[OebbAPI].getStopInfo', () => {
  it('getStopInfo() returns empty object without id', async () => {
    const locations = await oebbAPI.getStopInfo()
    expect(locations).toMatchInlineSnapshot(`Object {}`)
  })

  it('getStopInfo() returns object for id', async () => {
    const wienHbf = '1290401'
    const locations = await oebbAPI.getStopInfo(wienHbf)
    expect(locations).toMatchSnapshot()
  })
})
