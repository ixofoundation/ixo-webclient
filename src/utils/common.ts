export const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const sleep = async (ms: number) => {
  let timer: NodeJS.Timer
  return new Promise((resolve) => {
    timer = setTimeout(() => {
      resolve(true)
      clearTimeout(timer)
    }, ms)
  })
}
