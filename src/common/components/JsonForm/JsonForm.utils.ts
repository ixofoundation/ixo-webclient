export const transformErrors = (errors): any => {
  return errors.map(error => {
    if (error) {
      return {
        ...error,
        message: `This field ${error.message}`,
      }
    }
    return error
  })
}

export const transformErrors2 = (errors, touched): any => {
  return errors
    .filter(error => Object.keys(touched).includes(error.property))
    .map(error => {
      if (error) {
        return {
          ...error,
          message: `This field ${error.message}`,
        }
      }
      return error
    })
}
