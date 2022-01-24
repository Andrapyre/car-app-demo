import { validateEnum } from "../utils/utils"

export enum BrandId {
  AUDI = 1,
  BMW = 2,
  FORD = 3,
  TOYOTA = 4,
}

export const allBrandIds = [
  BrandId.AUDI,
  BrandId.BMW,
  BrandId.FORD,
  BrandId.TOYOTA,
]

export const validateBrandId = (input: number) =>
  validateEnum(input, allBrandIds)
