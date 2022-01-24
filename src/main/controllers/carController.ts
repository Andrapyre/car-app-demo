import { json, Express, Response } from "express"
import { v4 } from "uuid"
import {
  CarDb,
  convertCarDbToCarDto,
  convertCarDbToCarMetadataDto,
} from "../models/CarDb"
import { convertCarReqDtoToCarDb } from "../models/CarDto"
import { CarsRepository } from "../repository/CarsRepository"
import { carIdParserMiddelware, parseCarBody } from "../utils/Parser"

export const carController = (app: Express, carsRepository: CarsRepository) => {
  app.get("/cars", (req, res) => {
    handlePromiseAsServerError(res, carsRepository.getCars(), (dbCars) => {
      const cars = dbCars.map(convertCarDbToCarMetadataDto)
      res.status(200).json(cars)
    })
  })

  app.get("/cars/:id", carIdParserMiddelware, async (req, res) => {
    handlePromiseAsServerError(
      res,
      carsRepository.getCar(req.params.id),
      (carOption) => {
        if (carOption) {
          const carDto = convertCarDbToCarDto(carOption)
          res.status(200).json(carDto)
        } else {
          res.status(404).send()
        }
      }
    )
  })

  app.post("/cars", json(), (req, res) => {
    parseCarBody(req, res, async (body) => {
      const id = v4()
      const car: CarDb = convertCarReqDtoToCarDb(body, id)
      handlePromiseAsServerError(res, carsRepository.createCar(car), (car) => {
        const carDto = convertCarDbToCarDto(car)
        res.status(201).json(carDto)
      })
    })
  })

  app.put("/cars/:id", json(), carIdParserMiddelware, (req, res) => {
    parseCarBody(req, res, (body) => {
      const { id } = req.params
      const carDb = convertCarReqDtoToCarDb(body, id)
      handlePromiseAsServerError(
        res,
        carsRepository.updateCar(carDb),
        (updateResult) => {
          if (updateResult.matchedCount === 1) {
            res.status(200).json(convertCarDbToCarDto(carDb))
          } else res.status(404).send()
        }
      )
    })
  })

  app.delete("/cars/:id", carIdParserMiddelware, async (req, res) => {
    const { id } = req.params
    handlePromiseAsServerError(
      res,
      carsRepository.deleteCar(id),
      (deleteResult) => {
        if (deleteResult.deletedCount === 1) res.status(204).send()
        else res.status(404).send()
      }
    )
  })
}

const handlePromiseAsServerError = <G>(
  res: Response,
  promiseAction: Promise<G>,
  callback: (callbackData: G) => void
) => {
  return promiseAction.then(
    (data) => {
      callback(data)
    },
    () => {
      res
        .status(500)
        .send("Our server encountered an error. Please try again later.")
    }
  )
}
