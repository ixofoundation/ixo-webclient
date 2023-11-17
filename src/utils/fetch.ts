export async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries: number,
  delay: number,
): Promise<Response> {
  async function attemptFetch(remainingRetries: number): Promise<Response> {
    console.log('Retry number, ', remainingRetries, 'url: ', url)
    try {
      const response = await fetch(url, options)
      if (!response.ok && remainingRetries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay))
        return attemptFetch(remainingRetries - 1)
      }
      return response
    } catch (error) {
      if (remainingRetries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay))
        return attemptFetch(remainingRetries - 1)
      }
      throw error
    }
  }

  return attemptFetch(retries)
}
