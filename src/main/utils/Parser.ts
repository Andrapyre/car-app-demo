import * as uuid from "uuid"
import { Request, Response, NextFunction } from "express"
import Ajv from "ajv"
import { CarRequestDto, carRequestDtoSchema } from "../models/CarDto"

const ajv = new Ajv({ removeAdditional: true })

export const carIdParserMiddelware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isIdValid = uuid.validate(req.params.id)
  if (!isIdValid) {
    res.status(400).send("Car id was not valid. Please submit a valid uuid")
  }
  next()
}

export const parseCarBody = (
  req: Request,
  res: Response,
  callback: (parsedBody: CarRequestDto) => void
): void => {
  const { body } = req
  const validateCarRequestDto = ajv.compile(carRequestDtoSchema)
  if (validateCarRequestDto(body)) {
    callback(body)
  } else {
    res.status(400).json(validateCarRequestDto.errors)
  }
}
