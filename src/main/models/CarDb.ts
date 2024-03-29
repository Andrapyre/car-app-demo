import { BrandId } from "./BrandId"
import { CarMetadataResponseDto, CarResponseDto } from "./CarDto"
import { PaintColor } from "./PaintColor"
import { TransmissionType } from "./TransmissionType"

export interface CarDb {
  _id: string
  brandId: BrandId
  color?: PaintColor
  hasAccident?: boolean
  seats?: number
  transmission: TransmissionType
}

export const convertCarDbToCarDto = (car: CarDb): CarResponseDto => {
  const { _id, brandId, color, hasAccident, seats, transmission } = car
  return {
    carId: _id,
    brandId,
    color,
    hasAccident,
    seats,
    transmission,
  }
}

export const convertCarDbToCarMetadataDto = (
  car: CarDb,
): CarMetadataResponseDto => {
  const { _id, brandId } = car
  return {
    carId: _id,
    brandId,
  }
}
