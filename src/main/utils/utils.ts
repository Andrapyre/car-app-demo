export const validateEnum = <G>(input: G, enumArray: G[]): boolean => {
  if (enumArray.indexOf(input) > -1) return true
  else return false
}
