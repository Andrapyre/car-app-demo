import { JSONSchemaType } from "ajv"
import { allBrandIds, BrandId } from "./BrandId"
import { CarDb } from "./CarDb"
import { PaintColor } from "./PaintColor"
import { TransmissionType } from "./TransmissionType"

export interface CarRequestDto {
  brandId: BrandId
  color?: PaintColor
  hasAccident?: boolean
  seats?: number
  transmission: TransmissionType
}

export interface CarResponseDto {
  carId: string
  brandId: BrandId
  color?: PaintColor
  hasAccident?: boolean
  seats?: number
  transmission: TransmissionType
}

export interface CarMetadataResponseDto {
  carId: string
  brandId: BrandId
}

export const carRequestDtoSchema: JSONSchemaType<CarRequestDto> = {
  type: "object",
  properties: {
    brandId: {
      type: "number",
      enum: allBrandIds,
    },
    color: {
      type: "string",
      enum: [
        PaintColor.BLUE,
        PaintColor.GREEN,
        PaintColor.ORANGE,
        PaintColor.RED,
      ],
      nullable: true,
    },
    hasAccident: { type: "boolean", nullable: true },
    seats: { type: "number", nullable: true },
    transmission: {
      type: "string",
      enum: [TransmissionType.AUTOMATIC, TransmissionType.MANUAL],
    },
  },
  required: ["brandId", "transmission"],
  additionalProperties: false,
}

export const convertCarReqDtoToCarDb = (
  carReq: CarRequestDto,
  id: string
): CarDb => {
  return {
    _id: id,
    brandId: carReq.brandId,
    color: carReq.color,
    hasAccident: carReq.hasAccident,
    seats: carReq.seats,
    transmission: carReq.transmission,
  }
}
