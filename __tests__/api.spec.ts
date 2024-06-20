import sinon from "sinon"
import server from "../src/index"
import request from "supertest"

describe("GET /api", function () {
  beforeEach(() => {
    server.listen(8180)
  })
  afterEach((done) => {
    server.close(done)
  })
  it("respond with json", async () => {
    const res = await request(server).get("/")
    expect(res.status).toEqual(200)
    expect(res.text).toEqual("Get action was requested")
  })
})
