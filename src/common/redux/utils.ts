import * as _ from 'lodash'

export const omitKey = (oldObject: {}, keyToEmit: string): {} => {
  return Object.keys(oldObject).reduce((object, key) => {
    if (key !== keyToEmit) {
      object[key] = oldObject[key]
    }
    return object
  }, {})
}

export const moveObjectElement = (currentKey, afterKey, obj): any => {
  const result = {}
  const val = obj[currentKey]
  delete obj[currentKey]
  let next = -1
  let i = 0
  if (typeof afterKey == 'undefined' || afterKey == null) afterKey = ''
  Object.keys(obj).forEach(function (k) {
    if ((afterKey == '' && i == 0) || next == 1) {
      result[currentKey] = val
      next = 0
    }
    if (k == afterKey) {
      next = 1
    }
    result[k] = obj[k]
    ++i
  })
  if (next == 1) {
    result[currentKey] = val
  }
  if (next !== -1) return result
  else return obj
}

export const reorderObjectElement = (srcKey, dstKey, obj): any => {
  const arr = _.map(obj, (value, prop) => ({ prop, value }))

  const srcIndex = arr.findIndex((item) => item.prop === srcKey)
  const srcObj = arr.find((item) => item.prop === srcKey)
  const dstIndex = arr.findIndex((item) => item.prop === dstKey)

  if (srcIndex > dstIndex) {
    arr.splice(srcIndex, 1)
    arr.splice(dstIndex, 0, srcObj);
  } else {
    arr.splice(dstIndex + 1, 0, srcObj);
    arr.splice(srcIndex, 1)
  }

  return _.mapValues(_.keyBy(arr, 'prop'), 'value')
}
