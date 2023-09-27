import { Handler } from '@netlify/functions'
import axios from 'axios'

const handler: Handler = async (event, context) => {
  if (event.body || event.queryStringParameters) {
    const { queryStringParameters: args } = event

    const cookingSessions = await axios.get(
      `https://api.supamoto.app/api/v2/stoves/${args?.deviceId}/sessions/cooking?page=0&pageSize=500&startDate=${args?.startDate}&endDate=${args?.endDate}`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        auth: {
          username: 'ixo',
          password: '1a090ca17e0b26b1a68d4',
        },
      },
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ ...cookingSessions.data }),
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Incorrect argument/s passed' }),
  }
}

export { handler }
