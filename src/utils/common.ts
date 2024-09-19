export const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const sleep = async (ms: number): Promise<boolean> => {
  let timer: ReturnType<typeof setTimeout>
  return new Promise((resolve) => {
    timer = setTimeout(() => {
      resolve(true)
      clearTimeout(timer)
    }, ms)
  })
}

export function findKeyValuePairs(obj: Record<string, any>, propertyName: string, value: string) {
  const result = {}
  Object.keys(obj).forEach((key) => {
    if (obj[key][propertyName] === value) {
      result[key] = obj[key]
    }
  })
  return result
}

export const LINKED_RESOURCE_TYPES_PREFIX = 'display:'
export function getLinkedResourceTypeFromPrefix(linkedResourceType: string): string {
  return linkedResourceType.replace(LINKED_RESOURCE_TYPES_PREFIX, '')
}
