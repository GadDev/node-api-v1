import express from "express"
import url from "url"
import path from "path"
import logger from "morgan"
import cookieParser from "cookie-parser"
import http from "http"
import bodyParser from "body-parser"
import contacts, { Contact } from "./modules/contacts"
import morgan from "morgan"
import cors from "cors"

const app = express()

app.get("/hello-world", (req, res) => {
  const params = url.parse(req.url, true).query

  if (Object.keys(params).length === 0) {
    res.send("Hello all")
  } else {
    res.send("hello " + params.name)
  }
})

app.get("/contacts", (req, res) => {
  const params = url.parse(req.url, true).query

  const paramsAllowed = ["firstname", "lastname", "primarycontactnumber"]

  if (Object.keys(params).length === 0) {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(contacts.list()))
  } else {
    res.setHeader("Content-Type", "application/json")

    if (paramsAllowed.includes(params.arg as string)) {
      res.end(
        JSON.stringify(
          contacts.queryByArg(
            params.arg as string as keyof Contact,
            params.value as string,
          ),
        ),
      )
    } else {
      res.end(JSON.stringify({ error: "Invalid query parameter" }))
    }
  }
})

app.get("/contacts/:number", cors(), (req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(contacts.query(req.params.number)))
})

app.get("/groups", (req, res) => {
  console.log("groups")
  // res.setHeader("Content-Type", "application/json")
  // res.end(JSON.stringify(contacts.listGroup()))
  res.format({
    "application/json": () => {
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(contacts.listGroup()))
    },
    "text/xml": () => {
      const xml = contacts.listGroupXML()
      res.setHeader("Content-Type", "application/xml")
      res.end(xml)
    },
    default: () => {
      res.status(406).send("Not Acceptable")
    },
  })
})

app.get("/groups/:name", (req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(contacts.getMembers(req.params.name)))
})

http.createServer(app).listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})
