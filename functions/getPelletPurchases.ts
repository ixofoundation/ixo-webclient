import { Handler } from '@netlify/functions'
import axios from 'axios'

const handler: Handler = async (event, context) => {
  if (event.body || event.queryStringParameters) {
    const { queryStringParameters: args } = event

    const pelletPurchases = await axios.get(
      `https://api.supamoto.app/api/v2/stoves/${args?.deviceId}/pellets/purchases?page=0&pageSize=500&startDate=${args?.startDate}&endDate=${args?.endDate}`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        auth: {
          username: process.env.SUPAMOTO_USERNAME!,
          password: process.env.SUPAMOTO_PASSWORD!,
        },
      },
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ ...pelletPurchases.data }),
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Incorrect argument/s passed' }),
  }
}

export { handler }
