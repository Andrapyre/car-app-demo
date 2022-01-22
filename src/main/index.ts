import express, { json } from "express"
import { CarsRepository } from "./repository/CarsRepository"
import { carIdParserMiddelware, parseCarBody } from "./utils/Parser"
import * as mongoose from "mongoose"
import { v4 } from "uuid"
import { CarDb } from "./models/CarDb"

const app = express()
const PORT = 3000

const dbClient = await mongoose.connect("mongodb://localhost:27017")
const carsRepository = new CarsRepository(dbClient)

app.get("/cars", (req, res) => {
  res.send("Here's a list of metadata")
})

app.get("/cars/:id", carIdParserMiddelware, (req, res) => {
  res.send("You submitted a good uuid")
})

app.post("/cars", json(), (req, res) => {
  parseCarBody(req, res, async (body) => {
    const id = v4()
    const car: CarDb = {
      _id: id,
      brandId: body.brandId,
      color: body.color,
      hasAccident: body.hasAccident,
      seats: body.seats,
      transmission: body.transmission,
    }
    carsRepository.createCar(car).then(
      (car) => {
        res.status(201).json(car)
      },
      () => {
        res
          .status(500)
          .send("Our server encountered an error. Please try again later.")
      }
    )
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
