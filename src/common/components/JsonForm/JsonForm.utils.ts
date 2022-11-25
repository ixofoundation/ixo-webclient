const getError = (error: any): any => {
  let message = error.message
  if (message === 'should be string') {
    message = 'is a required property'
  }

  return {
    ...error,
    message: `This field ${error.message}`,
  }
}

export const transformErrors = (errors: any[]): any => {
  return errors.map((error) => {
    if (error) {
      return getError(error)
    }
    return error
  })
}

export const transformErrorsTouched = (errors: any[], touched: any): any => {
  return errors
    .filter((error) => Object.keys(touched).includes(error.property))
    .map((error) => {
      if (error) {
        return getError(error)
      }
      return error
    })
}
