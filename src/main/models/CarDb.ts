import { BrandId, CarResponseDto, PaintColor, TransmissionType } from "./CarDto"

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
