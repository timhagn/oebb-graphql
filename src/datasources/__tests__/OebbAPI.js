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

  it('getLocations() returns empty array with wrong name', async () => {
    const name = '@'
    const locations = await oebbAPI.getLocations(name)
    expect(locations).toMatchInlineSnapshot(`
      Array [
        Object {
          "geo": Object {
            "id": "1290401",
            "latitude": 48.185507,
            "longitude": 16.375326,
            "type": "location",
          },
          "id": "1290401",
          "name": "A-1040",
          "products": Object {
            "bus": true,
            "ferry": false,
            "interregional": true,
            "national": true,
            "nationalExpress": true,
            "onCall": false,
            "regional": true,
            "suburban": true,
            "subway": true,
            "tram": true,
          },
          "type": "stop",
        },
        Object {
          "geo": Object {
            "id": "1191201",
            "latitude": 48.174559,
            "longitude": 16.333211,
            "type": "location",
          },
          "id": "1191201",
          "name": "A-1120",
          "products": Object {
            "bus": true,
            "ferry": false,
            "interregional": true,
            "national": true,
            "nationalExpress": true,
            "onCall": false,
            "regional": true,
            "suburban": true,
            "subway": true,
            "tram": true,
          },
          "type": "stop",
        },
        Object {
          "geo": Object {
            "id": "1130401",
            "latitude": 47.811691,
            "longitude": 16.233808,
            "type": "location",
          },
          "id": "1130401",
          "name": "A-2700",
          "products": Object {
            "bus": true,
            "ferry": false,
            "interregional": true,
            "national": true,
            "nationalExpress": true,
            "onCall": true,
            "regional": true,
            "suburban": true,
            "subway": false,
            "tram": false,
          },
          "type": "stop",
        },
        Object {
          "geo": Object {
            "id": "1130201",
            "latitude": 48.208178,
            "longitude": 15.623099,
            "type": "location",
          },
          "id": "1130201",
          "name": "A-3100",
          "products": Object {
            "bus": true,
            "ferry": false,
            "interregional": true,
            "national": true,
            "nationalExpress": true,
            "onCall": false,
            "regional": true,
            "suburban": true,
            "subway": false,
            "tram": false,
          },
          "type": "stop",
        },
        Object {
          "geo": Object {
            "id": "1193001",
            "latitude": 48.119859,
            "longitude": 16.562571,
            "type": "location",
          },
          "id": "1193001",
          "name": "A-1300",
          "products": Object {
            "bus": true,
            "ferry": false,
            "interregional": true,
            "national": false,
            "nationalExpress": true,
            "onCall": false,
            "regional": true,
            "suburban": true,
            "subway": false,
            "tram": false,
          },
          "type": "stop",
        },
      ]
    `)
  })

  it('getLocations() returns array with names "Wien"', async () => {
    const name = `Wien`
    const locations = await oebbAPI.getLocations(name)
    expect(locations).toMatchSnapshot()
  })
})
