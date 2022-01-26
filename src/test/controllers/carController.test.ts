import express from "express"
import * as winston from "winston"
import { carController } from "../../main/controllers/carController"
import { BrandId } from "../../main/models/BrandId"
import { PaintColor } from "../../main/models/PaintColor"
import { TransmissionType } from "../../main/models/TransmissionType"
import { CarsRepository } from "../../main/repository/CarsRepository"
import mongoose, { Mongoose } from "mongoose"
import * as uuid from "uuid"
import {
  CarDb,
  convertCarDbToCarDto,
  convertCarDbToCarMetadataDto,
} from "../../main/models/CarDb"
import { CarRequestDto } from "../../main/models/CarDto"
import * as axios from "axios"
import { Server } from "http"

describe("Car Controller", () => {
  const app = express()
  const port = 5001
  const testEndpoint = `http://localhost:${port}`
  const httpClient = axios.default

  const logger = winston.createLogger({
    level: "info",
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
  })

  let carsRepository: CarsRepository
  let server: Server
  let dbClient: Mongoose

  beforeAll(async () => {
    server = app.listen(port, () =>
      logger.info(`Test server is running on port: ${port}`)
    )
    dbClient = await mongoose.connect("mongodb://localhost:27017")
    carsRepository = new CarsRepository(dbClient)
  })

  afterAll(async () => {
    await dbClient.disconnect()
    await new Promise((resolve) => {
      server.close(() => {
        resolve("Server closed")
      })
    })
  })

  const notFoundId = "3cdde6e6-a57d-426d-949d-311aa1250894"

  describe("GET /cars", () => {
    it("returns 200 when car exists", async () => {
      carController(app, carsRepository, logger)
      const carDb1 = generateSampleCarDb()
      const carDb2 = generateSampleCarDb()
      const carDb3 = generateSampleCarDb()
      await carsRepository.createCar(carDb1)
      await carsRepository.createCar(carDb2)
      await carsRepository.createCar(carDb3)

      const url = `${testEndpoint}/cars`
      const result = await httpClient.get(url)
      const cars = [carDb1, carDb2, carDb3]
      const carsMetadata = cars.map(convertCarDbToCarMetadataDto)

      expect(result.status).toBe(200)
      expect(result.data).toEqual(carsMetadata)

      await carsRepository.deleteCar(carDb1._id)
      await carsRepository.deleteCar(carDb2._id)
      await carsRepository.deleteCar(carDb3._id)
    })
  })

  describe("GET /cars/:id", () => {
    it("returns 200 when car exists", async () => {
      carController(app, carsRepository, logger)
      const carDb = generateSampleCarDb()
      await carsRepository.createCar(carDb)
      const url = `${testEndpoint}/cars/${carDb._id}`
      const result = await httpClient.get(url)

      expect(result.status).toBe(200)
      expect(result.data).toEqual(convertCarDbToCarDto(carDb))
    })
    it("returns 400 when id cannot be parsed", async () => {
      await testIfIdParserIsWorking()
    })
    it("returns 404 when car cannot be found", async () => {
      await test404()
    })
  })

  describe("DELETE /cars/:id", () => {
    it("returns 204 when car exists", async () => {
      carController(app, carsRepository, logger)
      const carDb = generateSampleCarDb()
      await carsRepository.createCar(carDb)
      const url = `${testEndpoint}/cars/${carDb._id}`
      const result = await httpClient.delete(url)

      expect(result.status).toBe(204)
    })
    it("returns 400 when id cannot be parsed", async () => {
      await testIfIdParserIsWorking()
    })
    it("returns 404 when car cannot be found", async () => {
      await test404()
    })
  })

  describe("POST /cars", () => {
    const url = `${testEndpoint}/cars`
    it("returns 201 when car exists", async () => {
      carController(app, carsRepository, logger)
      const body = generateSampleCarBody()
      const result = await httpClient.post(url, body)
      const { brandId, transmission, hasAccident, seats, color } = body
      expect(result.status).toBe(201)
      expect(result.data).toEqual({
        carId: result.data.carId,
        brandId,
        transmission,
        seats,
        color,
        hasAccident,
      })
    })
  })

  describe("PUT /cars/:id", () => {
    it("returns 200 when car exists", async () => {
      carController(app, carsRepository, logger)
      const carDb = generateSampleCarDb()
      await carsRepository.createCar(carDb)
      const url = `${testEndpoint}/cars/${carDb._id}`
      const { brandId, transmission, hasAccident, seats, color } = carDb
      const body: CarRequestDto = {
        brandId,
        transmission,
        hasAccident,
        seats: 5,
        color: PaintColor.GREEN,
      }
      const result = await httpClient.put(url, body)

      expect(result.status).toBe(200)
      expect(result.data).toEqual({ ...body, carId: carDb._id })
    })

    it("returns 400 when id cannot be parsed", async () => {
      await testIfIdParserIsWorking()
    })

    it("returns 404 when car cannot be found", async () => {
      await test404()
    })
  })

  const testIfIdParserIsWorking = async () => {
    carController(app, carsRepository, logger)
    const url = `${testEndpoint}/cars/1234`
    await expect(httpClient.get(url)).rejects.toThrowError()
  }

  const test404 = async () => {
    carController(app, carsRepository, logger)
    const url = `${testEndpoint}/cars/${notFoundId}`

    await expect(httpClient.get(url)).rejects.toThrowError()
  }
})

const generateSampleCarDb = (): CarDb => {
  const id = uuid.v4()
  return {
    _id: id,
    brandId: BrandId.AUDI,
    transmission: TransmissionType.AUTOMATIC,
    hasAccident: false,
    seats: 12,
    color: PaintColor.BLUE,
  }
}

const generateSampleCarBody = (): CarRequestDto => {
  return {
    brandId: BrandId.AUDI,
    transmission: TransmissionType.AUTOMATIC,
    hasAccident: false,
    seats: 12,
    color: PaintColor.BLUE,
  }
}
