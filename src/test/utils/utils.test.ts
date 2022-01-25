import {
  promiseErrorHandler,
  validateInputAgainstEnum,
} from "../../main/utils/utils"

describe("Utils", () => {
  describe("Enum input validator", () => {
    enum SampleEnum {
      SAMPLE_1 = "1",
      SAMPLE_2 = "2",
      SAMPLE_3 = "3",
      SAMPLE_4 = "4",
      SAMPLE_5 = "5",
    }
    it("should return true for valid input", () => {
      const input = "1"
      const result = validateInputAgainstEnum<string>(
        input,
        Object.values(SampleEnum)
      )
      expect(result).toBe(true)
    })

    it("should return false for invalid input", () => {
      const input = "6"
      const result = validateInputAgainstEnum<string>(
        input,
        Object.values(SampleEnum)
      )
      expect(result).toBe(false)
    })
  })

  describe("Promise error handler", () => {
    const successString = "result"
    const errorString = "Failed to get result"
    it("should return the result when the promise is resolved", async () => {
      const promise = Promise.resolve(successString)
      const result = await promiseErrorHandler(promise, errorString)
      expect(result).toBe(successString)
    })

    it("should return the error construct when the promise is rejected", async () => {
      const rejectedPromiseError = "promise rejected"
      const promise = Promise.reject(rejectedPromiseError)
      promiseErrorHandler(promise, errorString).then(
        () => {
          expect(false)
        },
        (err) => {
          expect(err).toEqual({
            message: errorString,
            context: rejectedPromiseError,
          })
        }
      )
    })
  })
})
