import BigNumber from 'bignumber.js'

export const strToArray = (str: string): Uint8Array => {
  return new Uint8Array(Buffer.from(str))
}

export const getMicroAmount = (amount: string, decimals = 6): string => {
  return new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toString()
}

function Utf8ArrayToStr(array: Uint8Array) {
  let out, i, c
  let char2, char3

  out = ''
  const len = array.length
  i = 0
  while (i < len) {
    c = array[i++]
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c)
        break
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++]
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f))
        break
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++]
        char3 = array[i++]
        out += String.fromCharCode(((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0))
        break
    }
  }

  return out
}
export function Uint8ArrayToJS(data: Uint8Array): string {
  const decodedData = Utf8ArrayToStr(data)
  return decodedData
}

export function base64ToJson(b64: string): any {
  try {
    const decodedStr: string = Buffer.from(b64, 'base64').toString('utf-8')
    const jsonObj: any = JSON.parse(decodedStr)
    return jsonObj
  } catch (error) {
    console.error('An error occurred:', error)
    return null
  }
}

export function hexToUint8Array(hexString: string): Uint8Array {
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0, c = 0; c < hexString.length; i++, c += 2) {
    bytes[i] = parseInt(hexString.substring(c, c + 2), 16);
  }
  return bytes;
}