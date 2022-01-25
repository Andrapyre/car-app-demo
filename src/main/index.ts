import express from "express"
import { CarsRepository } from "./repository/CarsRepository"
import mongoose from "mongoose"
import { carController } from "./controllers/carController"

const app = express()
const PORT = 3000

async function initializeControllers() {
  const prodMongoEndpoint = "mongodb://host.docker.internal:27017"
  const devMongoEndpoint = "mongodb://localhost:27017"
  if (process.env.NODE_ENV === "prod") {
    const dbClient = await mongoose.connect(prodMongoEndpoint)
    const carsRepository = new CarsRepository(dbClient)
    carController(app, carsRepository)
  } else {
    const dbClient = await mongoose.connect(devMongoEndpoint)
    const carsRepository = new CarsRepository(dbClient)
    carController(app, carsRepository)
  }
}

initializeControllers()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
