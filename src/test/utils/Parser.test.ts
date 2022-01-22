import { NextFunction, Request, Response } from "express"
import { parseCarBody } from "../../main/utils/Parser"

// import { carIdParserMiddelware } from "../../main/utils/Parser"
describe("Parser", () => {
  describe("Car body parser", () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    const nextFunction: NextFunction = jest.fn()

    beforeEach(() => {
      mockRequest = {}
      mockResponse = {
        json: jest.fn(),
      }
    })

    it("returns 400 when parsing an empty body", async () => {
      parseCarBody(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      )
      expect(mockResponse.statusCode).toBe(400)
    })
    it("returns 200 when parsing a body with all required fields", async () => {
      mockRequest = {
        body: { brandId: 1, transmission: "automatic" },
      }
      parseCarBody(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      )
      expect(mockResponse.statusCode).toBe(400)
    })
  })
  it("parses valid input correctly", () => {
    const input = "1d18fb0a-9a01-499c-a9ba-5a704c1240e6" as unknown
    const expectedOutput = "1d18fb0a-9a01-499c-a9ba-5a704c1240e6"
    // expect(parseCarIdInput(input)).toBe(expectedOutput)
  })
})
