import { json } from "body-parser"
import fs from "fs"
import path from "path"
import xml2js from "xml2js"
import { create } from "xmlbuilder2"

export type Contact = {
  firstname: string
  lastname: string
  title: string
  company: string
  jobtitle: string
  primarycontactnumber: string
  othercontactnumbers: string[]
  primaryemailaddress: string
  emailaddresses: string[]
  groups: string
}

type ContactList = {
  result: Contact[]
}

const pathJson = path.resolve(__dirname, "./data/contacts.json")
const pathXML = path.resolve(__dirname, "./data/contacts.xml")

const readJsonFile = () => {
  // const file = "./data/contacts.json"
  return fs.readFileSync(pathJson, "utf8")
}

const readXMLFile = () => {
  return fs.readFileSync(pathXML, "utf8")
}

const list = (): ContactList => {
  return JSON.parse(readJsonFile())
}

const query = (contactNumber: string) => {
  const jsonResult: ContactList = JSON.parse(readJsonFile())
  const result = jsonResult.result.find(
    (contact) => contact.primarycontactnumber === contactNumber,
  )

  return result || null
}

const queryByArg = (arg: keyof Contact, value: string | number) => {
  const jsonResult: ContactList = JSON.parse(readJsonFile())
  const result = jsonResult.result.find((contact) => contact[arg] === value)

  return result || null
}

const listGroup = () => {
  const jsonResult: ContactList = JSON.parse(readJsonFile())
  const result = jsonResult.result
  const resultArray = new Array()

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].groups.length; j++) {
      if (resultArray.indexOf(result[i].groups[j]) === -1) {
        resultArray.push(result[i].groups[j])
      }
    }
  }

  return resultArray
}

const listGroupXML = () => {
  const xmlResult = readXMLFile()

  // Parse the XML data
  let jsonData = null
  xml2js.parseString(xmlResult, (err, result) => {
    if (err) {
      throw err
    }
    jsonData = result
  })

  if (!jsonData) {
    throw new Error("Error parsing XML")
  }
  const result = (jsonData as any).results.result
  const resultArray = new Array()

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].groups.length; j++) {
      if (resultArray.indexOf(result[i].groups[j]) === -1) {
        resultArray.push(result[i].groups[j])
      }
    }
  }

  console.log(resultArray)

  const root = create({ contacts: { group: resultArray } })

  return root.end({
    prettyPrint: true,
  })
}

const getMembers = (groupName: string) => {
  const jsonResult = JSON.parse(readJsonFile())
  const result = jsonResult.result
  const resultArray = new Array()

  for (let i = 0; i < result.length; i++) {
    console.log(result[i].groups.indexOf(groupName))
    if (result[i].groups.indexOf(groupName) > -1) {
      resultArray.push(result[i])
    }
  }
  return resultArray
}

export default {
  list,
  query,
  queryByArg,
  listGroup,
  listGroupXML,
  getMembers,
}
