import { Model, Mongoose, Schema } from "mongoose"
import { CarDb } from "../models/CarDb"
import {
  validateBrandId,
  validatePaintColor,
  validateTransmissionType,
} from "../models/CarDomain"

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

  public async getCar(carId: string) {
    await this.CarModel.findById(carId)
  }

  public async getCars() {
    await this.CarModel.find({})
  }

  public async createCar(car: CarDb) {
    const carModelInstance = new this.CarModel(car)
    await carModelInstance.save()
  }

  public async updateCar(car: CarDb) {
    const carModelInstance = new this.CarModel(car)
    await carModelInstance.update()
  }

  public async deleteCar(carId: string) {
    await this.CarModel.deleteOne({ _id: carId })
  }
}
