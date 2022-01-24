import { NextFunction, Request, Response } from "express"
import { carIdParserMiddelware, parseCarBody } from "../../main/utils/Parser"

describe("Parser", () => {
  describe("Car Id Middleware Parser", () => {
    let mockResponse: Partial<Response>
    const nextFunction: NextFunction = jest.fn()

    beforeEach(() => {
      const initMockResponse = () => {
        const res: Partial<Response> = {}
        res.status = jest.fn().mockReturnValue(res)
        res.send = jest.fn().mockReturnValue(res)
        return res
      }
      mockResponse = initMockResponse()
    })

    it("returns 400 when parsing an invalid id", async () => {
      const mockRequest: Partial<Request> = { params: { id: "12345" } }
      carIdParserMiddelware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      )
      expect(mockResponse.status).toBeCalledWith(400)
    })

    it("allows application to proceed when id is valid", async () => {
      const mockRequest: Partial<Request> = {
        params: { id: "c42f90e3-1e52-47e3-b192-a35f6813bf1b" },
      }
      carIdParserMiddelware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      )
      expect(nextFunction).toBeCalled()
    })
  })

  describe("Car body parser", () => {
    let mockResponse: Partial<Response>
    const callback = jest.fn()

    beforeEach(() => {
      const initMockResponse = () => {
        const res: Partial<Response> = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res
      }
      mockResponse = initMockResponse()
    })

    it("returns 400 when parsing an empty body", async () => {
      const mockRequest: Partial<Request> = {}
      parseCarBody(mockRequest as Request, mockResponse as Response, callback)

      expect(mockResponse.status).toBeCalledWith(400)
    })

    it("allows application to proceed when parsing a body with all required fields", async () => {
      const mockRequest: Partial<Request> = {
        body: { brandId: 1, transmission: "automatic" },
      }
      parseCarBody(mockRequest as Request, mockResponse as Response, callback)
      expect(callback).toBeCalled()
    })

    it("removes additional properties without throwing an error", async () => {
      const mockRequest: Partial<Request> = {
        body: {
          brandId: 1,
          transmission: "automatic",
          sample_additional_prop: 1,
        },
      }

      const expectedBodyAfterParsing = {
        brandId: 1,
        transmission: "automatic",
      }
      parseCarBody(mockRequest as Request, mockResponse as Response, callback)
      expect(callback).toBeCalledWith(expectedBodyAfterParsing)
    })
  })
})
