import { CarsRepository } from "../../main/repository/CarsRepository"
import mongoose from "mongoose"
import * as uuid from "uuid"
import { CarDb } from "../../main/models/CarDb"
import { TransmissionType } from "../../main/models/TransmissionType"
import { BrandId } from "../../main/models/BrandId"
import { PaintColor } from "../../main/models/PaintColor"
describe("Cars Repository", () => {
  let carsRepository: CarsRepository

  beforeAll(async () => {
    const dbClient = await mongoose.connect("mongodb://localhost:27017")
    carsRepository = new CarsRepository(dbClient)
  })

  describe("#getCar, #createCar", () => {
    it("returns a car when the car is there", async () => {
      const carDb = generateCarDb()
      await carsRepository.createCar(carDb)
      const result = await carsRepository.getCar(carDb._id)
      if (result) {
        expect(formatDbResult(result)).toEqual(carDb)
      } else expect(false)
      await carsRepository.deleteCar(carDb._id)
    })

    it("returns null when the car is not there", async () => {
      const id = uuid.v4()
      const result = await carsRepository.getCar(id)
      expect(result).toBe(null)
    })
  })

  describe("#getCars", () => {
    it("gets all cars successfully", async () => {
      const car1 = generateCarDb()
      const car2 = generateCarDb()
      const car3 = generateCarDb()
      const cars = [car1, car2, car3]
      await carsRepository.createCar(car1)
      await carsRepository.createCar(car2)
      await carsRepository.createCar(car3)

      const result = await carsRepository.getCars()
      const formattedResult = result.map(formatDbResult)
      expect(formattedResult).toEqual(cars)

      cars.map(async (car) => {
        await carsRepository.deleteCar(car._id)
      })
    })
  })

  describe("#updateCar", () => {
    it("successfully updates a car", async () => {
      const car = generateCarDb()
      await carsRepository.createCar(car)
      const { _id, brandId, hasAccident, seats, color } = car
      const updatedCar = {
        _id,
        brandId,
        transmission: TransmissionType.MANUAL,
        hasAccident,
        seats,
        color,
      }
      const result = await carsRepository.updateCar(updatedCar)
      expect(result.modifiedCount).toBe(1)
    })
  })

  describe("#deleteCar", () => {
    it("successfully deletes a car", async () => {
      const car = generateCarDb()
      await carsRepository.createCar(car)
      await carsRepository.deleteCar(car._id)
      const result = await carsRepository.getCar(car._id)
      if (result) {
        expect(formatDbResult(result)).toEqual(car)
      } else expect(false)
    })
  })

  //this is needed because the object returned from mongodb has a "__v" field which causes the tests to error out
  const formatDbResult = (unformatted: CarDb): CarDb => {
    const { _id, brandId, transmission, hasAccident, seats, color } =
      unformatted
    return { _id, brandId, transmission, hasAccident, seats, color }
  }

  const generateCarDb = () => {
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
})
