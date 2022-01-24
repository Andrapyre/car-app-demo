import { validateEnum } from "../utils/utils"

export enum TransmissionType {
  AUTOMATIC = "automatic",
  MANUAL = "manual",
}

export const allTransmissionTypes = [
  TransmissionType.AUTOMATIC,
  TransmissionType.MANUAL,
]

export const validateTransmissionType = (input: string) =>
  validateEnum(input, allTransmissionTypes)
