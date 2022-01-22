import { JSONSchemaType } from "ajv"

export enum TransmissionType {
  AUTOMATIC = "automatic",
  MANUAL = "manual",
}

export enum PaintColor {
  BLUE = "blue",
  GREEN = "green",
  ORANGE = "orange",
  RED = "red",
}

export enum BrandId {
  AUDI = 1,
  BMW = 2,
  FORD = 3,
  TOYOTA = 4,
}

export interface CarBodyDomain {
  brandId: BrandId
  color?: PaintColor
  hasAccident?: boolean
  seats?: number
  transmission: TransmissionType
}

export interface CarResponseDomain {
  carId: string
  brandId: BrandId
  color?: PaintColor
  hasAccident?: boolean
  seats?: number
  transmission: TransmissionType
}

export const carBodyDomainSchema: JSONSchemaType<CarBodyDomain> = {
  type: "object",
  properties: {
    brandId: {
      type: "number",
      enum: [BrandId.AUDI, BrandId.BMW, BrandId.FORD, BrandId.TOYOTA],
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
