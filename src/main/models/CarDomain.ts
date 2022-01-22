import { JSONSchemaType } from "ajv"

export enum TransmissionType {
  AUTOMATIC = "automatic",
  MANUAL = "manual",
}

const allTransmissionTypes = [
  TransmissionType.AUTOMATIC,
  TransmissionType.MANUAL,
]

export const validateTransmissionType = (input: string) =>
  validateEnum(input, allTransmissionTypes)

export enum PaintColor {
  BLUE = "blue",
  GREEN = "green",
  ORANGE = "orange",
  RED = "red",
}

const allPaintColorIds = [
  PaintColor.BLUE,
  PaintColor.GREEN,
  PaintColor.ORANGE,
  PaintColor.RED,
]

export const validatePaintColor = (input: string) =>
  validateEnum(input, allPaintColorIds)

export enum BrandId {
  AUDI = 1,
  BMW = 2,
  FORD = 3,
  TOYOTA = 4,
}

const allBrandIds = [BrandId.AUDI, BrandId.BMW, BrandId.FORD, BrandId.TOYOTA]

export const validateBrandId = (input: number) =>
  validateEnum(input, allBrandIds)

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

const validateEnum = <G>(input: G, enumArray: G[]): boolean => {
  if (enumArray.indexOf(input) > -1) return true
  else return false
}
