import { RateLimiter } from 'limiter'
import { sleep } from './common'

const limiter = new RateLimiter({ tokensPerInterval: 3, interval: 'second' })

export const sleepByLimiter = async () => {
  const remaining = limiter.getTokensRemaining()

  if (remaining < 1) {
    await sleep(1000)
    return
  }

  await limiter.removeTokens(1)
}
