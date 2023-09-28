import axios from 'axios'

export const getCookStove = async (deviceId: number | string) => {
  return await axios.get('/.netlify/functions/getCookStove', {
    params: { deviceId },
  })
}
