import { createServer } from "http"
import handleRequest from "./http-modules"

const PORT = 8180

const server = createServer(handleRequest).listen(PORT, "127.0.0.1")

console.log("Started Node.js http server at http://127.0.0.1:" + PORT)

export default server
