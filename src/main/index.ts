import express, { json } from "express"
import { carIdParserMiddelware, parseCarBody } from "./utils/Parser"

const app = express()
const PORT = 3000

app.get("/cars", (req, res) => {
  res.send("Here's a list of metadata")
})

app.get("/cars/:id", carIdParserMiddelware, (req, res) => {
  res.send("You submitted a good uuid")
})

app.post("/cars", json(), (req, res) => {
  parseCarBody(req, res, (data) => {
    res.status(201).send("Good job!")
  })
})

app.put("/cars/:id", json(), carIdParserMiddelware, (req, res) => {
  parseCarBody(req, res, (data) => {
    res.status(201).send("Good job!")
  })
})

app.delete("/cars/:id", carIdParserMiddelware, (req, res) => {
  res.send("You submitted a good uuid")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
