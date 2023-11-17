import { db } from 'db'
import axios from 'axios'

export async function fetchAndCacheAvatar(url: string): Promise<string | undefined> {
  if (url.length <= 0) return undefined
  const avatar = await db.avatars.get(url)

  if (!avatar) {
    const fetchedAvatar = await axios.get(url, { responseType: 'blob' }) // Fetch from IPFS as blob
    const base64Avatar = await convertToBase64(fetchedAvatar.data) // Convert to Base64
    db.avatars.add({ url, base64: base64Avatar })
    return base64Avatar
  }

  return avatar.base64
}

function convertToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
