import { json, Express, Response } from "express"
import { v4 } from "uuid"
import { CarDb, convertCarDbToCarDto } from "../models/CarDb"
import { convertCarReqDtoToCarDb } from "../models/CarDto"
import { CarsRepository } from "../repository/CarsRepository"
import { carIdParserMiddelware, parseCarBody } from "../utils/Parser"

export const carController = (app: Express, carsRepository: CarsRepository) => {
  app.get("/cars", (req, res) => {
    res.send("Here's a list of metadata")
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
        (car) => {
          res.status(200).json(car)
        }
      )
    })
  })

  app.delete("/cars/:id", carIdParserMiddelware, async (req, res) => {
    const { id } = req.params
    handlePromiseAsServerError(
      res,
      carsRepository.deleteCar(id),
      (isCarDeleted) => {
        if (isCarDeleted) res.status(204).send()
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