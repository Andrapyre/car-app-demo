import { Model, Mongoose, Schema } from "mongoose"
import { CarDb } from "../models/CarDb"

import { UpdateResult, DeleteResult } from "mongodb"
import { validateTransmissionType } from "../models/TransmissionType"
import { validatePaintColor } from "../models/PaintColor"
import { validateBrandId } from "../models/BrandId"
import { promiseErrorHandler } from "../utils/utils"

export class CarsRepository {
  private readonly CarModel: Model<CarDb>
  constructor(dbClient: Mongoose) {
    const schema = new Schema({
      _id: { type: String, required: true },
      brandId: { type: Number, required: true, validate: validateBrandId },
      color: { type: String, required: false, validate: validatePaintColor },
      hasAccident: { type: Boolean, required: false },
      seats: { type: Number, required: false },
      transmission: {
        type: String,
        required: true,
        validate: validateTransmissionType,
      },
    })
    this.CarModel = dbClient.model<CarDb>("Car", schema)
  }

  public async getCar(carId: string): Promise<CarDb | null> {
    const promise = this.CarModel.findById(carId).exec()
    return promiseErrorHandler(promise, `Could not get car for id: ${carId}`)
  }

  public async getCars(): Promise<CarDb[]> {
    const promise = this.CarModel.find({}).exec()
    return promiseErrorHandler(promise, "Could not get all cars from db")
  }

  public async createCar(car: CarDb): Promise<CarDb> {
    const carModelInstance = new this.CarModel(car)
    const promise = carModelInstance.save()
    return promiseErrorHandler(
      promise,
      `Could not create car in db for car: ${JSON.stringify(car)}`
    )
  }

  public async updateCar(car: CarDb): Promise<UpdateResult> {
    const promise = this.CarModel.updateOne({ _id: car._id }, car).exec()
    return promiseErrorHandler(
      promise,
      `Could not update car in db for ${JSON.stringify(car)}`
    )
  }

  public async deleteCar(carId: string): Promise<DeleteResult> {
    const promise = this.CarModel.deleteOne({ _id: carId }).exec()
    return promiseErrorHandler(
      promise,
      `Could not delete car in db for id: ${carId}`
    )
  }
}
