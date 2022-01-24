import { Model, Mongoose, Schema } from "mongoose"
import { CarDb } from "../models/CarDb"

import { UpdateResult, DeleteResult } from "mongodb"
import { validateTransmissionType } from "../models/TransmissionType"
import { validatePaintColor } from "../models/PaintColor"
import { validateBrandId } from "../models/BrandId"

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
    return await this.CarModel.findById(carId)
  }

  public async getCars(): Promise<CarDb[]> {
    return await this.CarModel.find({})
  }

  public async createCar(car: CarDb): Promise<CarDb> {
    const carModelInstance = new this.CarModel(car)
    return await carModelInstance.save()
  }

  public async updateCar(car: CarDb): Promise<UpdateResult> {
    return await this.CarModel.updateOne({ _id: car._id }, car)
  }

  public async deleteCar(carId: string): Promise<DeleteResult> {
    return await this.CarModel.deleteOne({ _id: carId })
  }
}
