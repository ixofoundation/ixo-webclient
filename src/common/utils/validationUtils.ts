export const isEmail = (email?: string): boolean => {
  if (!email) {
    return false
  }

  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email.toLowerCase())
}

export const isHttpsUrl = (url?: string): boolean => {
  if (!url) {
    return false
  }

  const regex = /^https:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&=]*)/
  return regex.test(url.toLowerCase())
}

export const isInteger = (str?: string): boolean => {
  return /^(0|[1-9]\d*)$/.test(str)
}

export const isFloat = (str?: string): boolean => {
  return /^\d+(\.\d+)?$/.test(str)
}
