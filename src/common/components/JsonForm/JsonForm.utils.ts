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
