export const omitKey = (oldObject: {}, keyToEmit: string): {} => {
  return Object.keys(oldObject).reduce((object, key) => {
    if (key !== keyToEmit) {
      object[key] = oldObject[key]
    }
    return object
  }, {})
}
