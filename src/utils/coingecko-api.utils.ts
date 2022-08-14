import Axios from 'axios'

export const getUSDRateByDenom = (
  denom: string,
  currency = 'usd',
): Promise<number> => {
  return Axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${denom}&vs_currencies=${currency}`,
  )
    .then((response) => response.data)
    .then((response) => response[denom][currency])
    .catch(() => 0)
}
