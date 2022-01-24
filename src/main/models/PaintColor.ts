import { validateEnum } from "../utils/utils"

export enum PaintColor {
  BLUE = "blue",
  GREEN = "green",
  ORANGE = "orange",
  RED = "red",
}

export const allPaintColorIds = [
  PaintColor.BLUE,
  PaintColor.GREEN,
  PaintColor.ORANGE,
  PaintColor.RED,
]

export const validatePaintColor = (input: string) =>
  validateEnum(input, allPaintColorIds)
