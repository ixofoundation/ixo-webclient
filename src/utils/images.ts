export const requireCheckDefault = (mod: any) => {
  // console.log({ mod })
  return typeof mod === 'object' ? mod.default : mod
}

export const convertFileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e: any): void => {
      resolve(e.target.result)
    }
    reader.onerror = reader.onabort = (e): void => {
      reject(e)
    }
  })
}
