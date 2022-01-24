import { json, Express, Response } from "express"
import { v4 } from "uuid"
import { CarDb, convertCarDbToCarDto } from "../models/CarDb"
import { CarsRepository } from "../repository/CarsRepository"
import { carIdParserMiddelware, parseCarBody } from "../utils/Parser"

export const carController = (app: Express, carsRepository: CarsRepository) => {
  app.get("/cars", (req, res) => {
    res.send("Here's a list of metadata")
  })

  app.get("/cars/:id", carIdParserMiddelware, async (req, res) => {
    const carDb = await carsRepository.getCar(req.params.id)
    if (carDb) {
      const carDto = convertCarDbToCarDto(carDb)
      res.status(200).json(carDto)
    } else {
      res.status(404).send()
    }
  })

  app.post("/cars", json(), (req, res) => {
    parseCarBody(req, res, async (body) => {
      const id = v4()
      const car: CarDb = {
        _id: id,
        brandId: body.brandId,
        color: body.color,
        hasAccident: body.hasAccident,
        seats: body.seats,
        transmission: body.transmission,
      }
      carsRepository.createCar(car).then(
        (car) => {
          const carDto = convertCarDbToCarDto(car)
          res.status(201).json(carDto)
        },
        () => {
          res
            .status(500)
            .send("Our server encountered an error. Please try again later.")
        }
      )
    })
  })

  app.put("/cars/:id", json(), carIdParserMiddelware, (req, res) => {
    parseCarBody(req, res, (data) => {
      res.status(200).send("Good job!")
    })
  })

  app.delete("/cars/:id", carIdParserMiddelware, async (req, res) => {
    const { id } = req.params
    const isCarDeleted = await carsRepository.deleteCar(id)
    if (isCarDeleted) res.status(204).send()
    else res.status(404).send()
  })
}

const handleServerError = <G>(
  res: Response,
  action: () => Promise<G>,
  callback: (callbackData: G) => void
) => {
  return action().then(
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
