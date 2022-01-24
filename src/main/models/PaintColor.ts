import { validateInputAgainstEnum } from "../utils/utils"

export enum PaintColor {
  BLUE = "blue",
  GREEN = "green",
  ORANGE = "orange",
  RED = "red",
}

export const validatePaintColor = (input: string) =>
  validateInputAgainstEnum(input, Object.values(PaintColor))
