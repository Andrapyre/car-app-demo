export const validateInputAgainstEnum = <G>(
  input: G,
  enumArray: G[]
): boolean => {
  if (enumArray.indexOf(input) > -1) return true
  else return false
}

export const promiseErrorHandler = <G>(
  promise: Promise<G>,
  errorMessage: string
): Promise<G> => {
  return promise.then(
    (res) => {
      return Promise.resolve(res)
    },
    (err) => {
      return Promise.reject({ message: errorMessage, context: err })
    }
  )
}
