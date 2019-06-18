const OebbAPI = require(`../OebbAPI`)

const oebbAPI = new OebbAPI()

describe('[OebbAPI]', () => {
  it('isHealthy() returns true', async () => {
    const healthy = await oebbAPI.isHealthy()
    expect(healthy).toBeTruthy()
  })

  it('getLocations() returns empty array without name', async () => {
    const locations = await oebbAPI.getLocations()
    expect(locations).toMatchInlineSnapshot(`Array []`)
  })

  it('getLocations() returns empty array with empty name', async () => {
    const name = ``
    const locations = await oebbAPI.getLocations(name)
    expect(locations).toMatchInlineSnapshot(`Array []`)
  })

  // it('getLocations() returns empty array with wrong name', async () => {
  //   const name = "@"
  //   const locations = await oebbAPI.getLocations(name)
  //   expect(locations).toMatchInlineSnapshot(`Array []`)
  // })

  it('getLocations() returns array with name "Wien"', async () => {
    const name = `Wien`
    const locations = await oebbAPI.getLocations(name)
    expect(locations).toMatchSnapshot()
  })
})
