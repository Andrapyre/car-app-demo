import { BrandId, PaintColor, TransmissionType } from "./CarDomain"

export interface CarDb {
  _id: string
  brandId: BrandId
  color?: PaintColor
  hasAccident?: boolean
  seats?: number
  transmission: TransmissionType
}
