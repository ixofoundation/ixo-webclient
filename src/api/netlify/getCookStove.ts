import axios from 'axios'

export const getCookStove = async (deviceId: number | string) => {
  try {
    const { data } = await axios.get('/.netlify/functions/getCookStove', {
      params: { deviceId },
    })

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}
