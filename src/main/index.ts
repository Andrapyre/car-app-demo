import express from "express"
import { CarsRepository } from "./repository/CarsRepository"
import mongoose from "mongoose"
import { carController } from "./controllers/carController"

const app = express()
const PORT = 3000

async function initializeControllers() {
  const dbClient = await mongoose.connect("mongodb://localhost:27017")
  const carsRepository = new CarsRepository(dbClient)
  carController(app, carsRepository)
}

initializeControllers()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
