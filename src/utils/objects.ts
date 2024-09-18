import * as _ from 'lodash'
import { logs } from '@cosmjs/stargate'

export const omitKey = (oldObject: any, keyToEmit: string) => {
  return Object.keys(oldObject).reduce((object, key) => {
    if (key !== keyToEmit) {
      object[key] = oldObject[key]
    }
    return object
  }, {})
}

export const reorderObjectElement = (srcKey: string, dstKey: string, obj: any): any => {
  const arr = _.map(obj, (value, prop) => ({ prop, value }))

  const srcIndex = arr.findIndex((item) => item.prop === srcKey)
  const srcObj = arr.find((item) => item.prop === srcKey)
  const dstIndex = arr.findIndex((item) => item.prop === dstKey)

  if (srcIndex > dstIndex) {
    arr.splice(srcIndex, 1)
    arr.splice(dstIndex, 0, srcObj!)
  } else {
    arr.splice(dstIndex + 1, 0, srcObj!)
    arr.splice(srcIndex, 1)
  }

  return _.mapValues(_.keyBy(arr, 'prop'), 'value')
}

export const getValueFromEvents = (logs: readonly logs.Log[], type: string, attributeKey: string): string => {
  try {
    const value = logs[0].events
      .find((event) => event.type === type)
      ?.attributes.find((attribute) => attribute.key === attributeKey)?.value

    return value || ''
  } catch (e) {
    console.error('getValueFromEvents', e)
    return ''
  }
}

export const mapProposalObj = (obj: { [key: string]: Record<string, any>[] | Record<string, any> }) => {
  if (!obj || Object.keys(obj).length === 0) {
    return obj
  }

  const hiKey = Object.keys(obj)[0]
  const hiValue = Object.values(obj)[0]
  if (Array.isArray(hiValue)) {
    return { [hiKey]: hiValue[0] }
  }

  return obj
}
