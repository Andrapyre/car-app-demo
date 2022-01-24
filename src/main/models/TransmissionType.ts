import { validateInputAgainstEnum } from "../utils/utils"

export enum TransmissionType {
  AUTOMATIC = "automatic",
  MANUAL = "manual",
}

export const validateTransmissionType = (input: string) =>
  validateInputAgainstEnum(input, Object.values(TransmissionType))
