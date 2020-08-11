export const transformErrors = (errors: any): any => {
  return errors.map((error: any) => {
    if (error) {
      return {
        ...error,
        message: `This field ${error.message}`,
      };
    }
    return error;
  });
};
