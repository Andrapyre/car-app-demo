import * as uuid from "uuid"
import { Request, Response, NextFunction } from "express"
import Ajv from "ajv"
import { CarBodyDomain, carBodyDomainSchema } from "../models/CarDomain"

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
  callback: (parsedBody: CarBodyDomain) => void
): void => {
  const { body } = req
  const validateCarBodyDomain = ajv.compile(carBodyDomainSchema)
  if (validateCarBodyDomain(body)) {
    callback(body)
  } else {
    res.status(400).json(validateCarBodyDomain.errors)
  }
}
