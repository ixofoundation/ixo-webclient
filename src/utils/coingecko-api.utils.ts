import Axios from 'axios'

export const getUSDRateByCoingeckoId = (
  id: string,
  currency = 'usd',
): Promise<number> => {
  return Axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`,
  )
    .then((response) => response.data)
    .then((response) => response[id][currency])
    .catch(() => 0)
}
