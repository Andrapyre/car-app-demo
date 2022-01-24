import { validateEnum } from "../utils/utils"

export enum TransmissionType {
  AUTOMATIC = "automatic",
  MANUAL = "manual",
}

export const validateTransmissionType = (input: string) =>
  validateEnum(input, Object.values(TransmissionType))
