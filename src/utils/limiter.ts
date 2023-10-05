import { RateLimiter } from 'limiter'
import { sleep } from './common'

const limiter = new RateLimiter({ tokensPerInterval: 7, interval: 'second' })

export const sleepByLimiter = async () => {
  const remaining = limiter.getTokensRemaining()

  if (remaining < 0) {
    await sleep(10000)
    return
  }

  await limiter.removeTokens(1)
}
