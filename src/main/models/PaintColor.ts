import { validateEnum } from "../utils/utils"

export enum PaintColor {
  BLUE = "blue",
  GREEN = "green",
  ORANGE = "orange",
  RED = "red",
}

export const validatePaintColor = (input: string) =>
  validateEnum(input, Object.values(PaintColor))
