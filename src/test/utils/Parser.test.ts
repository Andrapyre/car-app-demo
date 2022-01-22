import { Request, Response } from "express"
import { parseCarBody } from "../../main/utils/Parser"

describe("Parser", () => {
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
  })
})
