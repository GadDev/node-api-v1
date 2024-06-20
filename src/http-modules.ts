import type { ServerResponse, IncomingMessage, RequestListener } from "http"

const handle_GET_request = (response: ServerResponse<IncomingMessage>) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  })
  response.end("Get action was requested")
}

const handle_POST_request = (response: ServerResponse<IncomingMessage>) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  })
  response.end("Post action was requested")
}

const handle_PUT_request = (response: ServerResponse<IncomingMessage>) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  })
  response.end("Put action was requested")
}

const handle_HEAD_request = (response: ServerResponse<IncomingMessage>) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  })
  response.end("Head action was requested")
}

const handle_DELETE_request = (response: ServerResponse<IncomingMessage>) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  })
  response.end("Delete action was requested")
}

const handle_bad_request = (response: ServerResponse<IncomingMessage>) => {
  response.writeHead(400, {
    "Content-Type": "text/plain",
  })
  response.end("Bad request")
}

const handle_request: RequestListener = (request, response) => {
  switch (request.method) {
    case "GET":
      handle_GET_request(response)
      break
    case "POST":
      handle_POST_request(response)
      break
    case "PUT":
      handle_PUT_request(response)
      break
    case "DELETE":
      handle_DELETE_request(response)
      break
    case "HEAD":
      handle_HEAD_request(response)
      break
    default:
      handle_bad_request(response)
      break
  }
  console.log("Request processing ended")
}

export default handle_request
