async function exponentialBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number,
  baseDelayMs: number = 1000,
  maxDelayMs: number = 30000,
): Promise<T> {
  let retries = 0

  const retry: () => Promise<T> = async () => {
    try {
      return await operation()
    } catch (error) {
      retries++

      if (retries <= maxRetries) {
        const delayMs = Math.min(baseDelayMs * Math.pow(2, retries - 1), maxDelayMs)
        await new Promise((resolve) => setTimeout(resolve, delayMs))
        return retry()
      } else {
        throw error // Max retries reached, rethrow the error
      }
    }
  }

  return retry()
}
